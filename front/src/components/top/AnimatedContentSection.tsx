"use client";

import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";

interface AnimatedContentSectionProps {
    title: string;
    children: ReactNode;
    colorReverseAnim?: "tb" | "bt"; // transparent → black or black → transparent
    className?: string;
}

export function AnimatedContentSection({ title, children, colorReverseAnim, className }: AnimatedContentSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.75 });


    const shortDelay = colorReverseAnim? 0: .5
    
    // 背景がグラデーションで移動
    const backgroundVariants = {
        hidden: {
            clipPath: colorReverseAnim === "tb" ? 'inset(0% 0% 0% 100%)': 'inset(0% 0% 0% 100%)',  
        },
        visible: {
            clipPath: colorReverseAnim === "tb" ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)',
            transition: { duration: .5, delay: 0, ease: 'easeOut' }
        }
    };

    // タイトルが中央に登場
    const titleAppearVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.4, delay: 0.45 - shortDelay, ease: 'easeInOut' }
        },
    };

    //  タイトルが上に移動
    const titleMoveVariants = {
        hidden: { y: "-50%" }, // Centered vertically
        visible: {
            y: "calc(-45vh + 64px)", // Moves up
            transition: { duration: 0.5, delay: 1.0 - shortDelay, ease: 'easeInOut' }
        }
    };
    
    // ボーダー付きボックスが上昇
    const boxVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 64,
            transition: { duration: 0.3, delay: 1.5 - shortDelay, ease: 'easeInOut' }
        }
    };

    // 5. コンテンツが表示
    const contentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3, delay: 1.65 - shortDelay, ease: 'easeOut' }
        }
    };

    const initialBgColor = colorReverseAnim ?(colorReverseAnim === 'bt' ? 'bg-black' : 'bg-transparent') : "bg-transparent";
    const bgColor = colorReverseAnim ? (colorReverseAnim === 'bt' ? 'bg-transparent' : 'bg-black') : "bg-transparent";

    return (
        <section
            ref={ref}
            className={`w-full overflow-hidden h-dvh flex items-center justify-center text-white relative ${initialBgColor} ${className || ''}`}
        >
            {/* Background Gradient Animation Overlay */}
            <motion.div
                className={`absolute inset-0 ${bgColor}`}
                variants={backgroundVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            />

            {/* Title (Appearance and Movement are separated) */}
            <motion.div
                className="absolute top-1/2"
                variants={titleMoveVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.div
                    variants={titleAppearVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <h2 className="text-4xl font-bold text-center">{title}</h2>
                </motion.div>
            </motion.div>

            {/* Content Box */}
            <motion.div
                className="w-[calc(100%-128px)] mx-auto"
                variants={boxVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className="p-8 backdrop-blur-lg border-white border-[1px] rounded-xl">
                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {children}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
