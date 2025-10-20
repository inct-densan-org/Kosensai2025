"use client"
import {createContext, ReactNode, useRef} from "react";
import {motion, MotionValue, useScroll} from "motion/react";

// Contextの型定義
interface ScrollContextType {
    scrollYProgress: MotionValue<number>;
}

export const ScrollContext = createContext<ScrollContextType | null>(null);

export default function ScrollContextProvider({ children, className }: { children: ReactNode, className?: string }) {
    const mainRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: mainRef,
        offset: ["start start", "end end"]
    });

    return (
        <ScrollContext.Provider value={{ scrollYProgress }}>
            <motion.main ref={mainRef} className={className}>
                {children}
            </motion.main>
        </ScrollContext.Provider>
    );
};
