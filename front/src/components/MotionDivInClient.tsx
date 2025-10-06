"use client"

import {motion, MotionProps} from "motion/react"
import {ReactNode} from "react";

type Props = {
    children: ReactNode
} & MotionProps

export const MotionDivInClient = ({children, ...props}: Props) => {
    return (
        <motion.div
            {...props}
        >
            {children}
        </motion.div>
    )
}