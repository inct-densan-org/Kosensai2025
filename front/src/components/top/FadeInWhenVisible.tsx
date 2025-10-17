"use client";
import {FC, ReactNode, useRef} from "react";
import {motion, useInView} from "motion/react"

interface FadeInWhenVisibleProps {
    children: ReactNode; // 子要素の型はReactNode
    className?: string;
}

export const FadeInWhenVisible: FC<FadeInWhenVisibleProps> = ({children, className}) => {
    const ref = useRef(null);
    const isInView = useInView(ref,
        {
            once: true, // 一度だけトリガーする
            amount: 0.1 // 要素が10%表示された時にトリガー

        }
    );

    return (
        <motion.div
            ref={ref} // Intersection Observerの監視対象
            initial={{opacity: 0, x: -50}} // 初期状態：透明
            animate={{opacity: isInView ? 1 : 0, x: 0}} // 表示状態：不透明
            transition={{duration: 0.6, delay: 0.3}} // アニメーション時間
            className={"md:w-full " + className}
        >
            {children}
        </motion.div>
    );
};