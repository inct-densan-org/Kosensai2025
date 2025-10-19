"use client";

import {motion, useScroll, useTransform} from "motion/react";
import {ReactNode, useMemo, useRef} from "react";

interface AnimatedContentSectionProps {
    title: string;
    children: ReactNode;
    colorReverseAnim?: "tb" | "bt"; // transparent → black or black → transparent
    className?: string;
}

export function AnimatedContentSection({title, children, colorReverseAnim, className}: AnimatedContentSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"], // 要素が画面下から現れ、画面上に見えなくなるまでをトラッキング

    });

    // useMemoを使用して、colorReverseAnimに依存する値を計算
    const {initialBgColor, bgColor, clipPathStart, clipPathEnd} = useMemo(() => {
        return {
            initialBgColor: colorReverseAnim === 'bt' ? 'bg-black' : 'bg-transparent',
            bgColor: colorReverseAnim === 'bt' ? 'bg-transparent' : 'bg-black',
            clipPathStart: colorReverseAnim === "tb" ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)',
            clipPathEnd: 'inset(0% 0% 0% 0%)'
        };
    }, [colorReverseAnim]);

    // 1. 背景アニメーション
    // 要素が画面の20%まで入ってきたら開始し、35%で完了
    const backgroundClipPath = useTransform(scrollYProgress, [0.05, 0.15], [clipPathStart, clipPathEnd]);

    // 2. タイトルの出現
    // 要素が画面の30%まで入ってきたら出現開始、40%で完了
    const titleOpacity = useTransform(scrollYProgress, [0.15, 0.2], [0, 1]);


    // 4. コンテンツボックスの出現
    // 要素が画面の50%から60%を通過する間に移動とフェードイン
    const boxOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
    const boxY = useTransform(scrollYProgress, [0.2, 0.3], ["114px", "64px"]); // 初期位置を調整

    // 5. コンテンツの出現
    // 要素が画面の55%から65%を通過する間にフェードイン
    const contentOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

    return (
        <motion.section
            ref={sectionRef}
            className={`w-full overflow-hidden h-[110dvh] py-[5dvh] flex items-center justify-center text-white relative ${className || ''} ${initialBgColor}`}
        >
            {/* Background Gradient Animation Overlay */}
            <motion.div
                className={`absolute inset-0 ${bgColor}`}
                style={{clipPath: colorReverseAnim ? backgroundClipPath : 'inset(0% 0% 0% 0%)'}}
            />

            <motion.div
                className={"absolute top-[calc(5dvh+64px)]"}
                style={{opacity: titleOpacity}}
            >
                <h2 className="text-4xl font-bold text-center">{title}</h2>
            </motion.div>

            {/* Content Box */}
            <motion.div
                className="w-[calc(100%-128px)] mx-auto absolute" // absoluteを追加して位置を制御
                style={{opacity: boxOpacity, y: boxY}}
            >
                <div className="p-8 backdrop-blur-lg border-white border-[1px] rounded-xl">
                    <motion.div
                        style={{opacity: contentOpacity}}
                    >
                        {children}
                    </motion.div>
                </div>
            </motion.div>
        </motion.section>
    );
}
