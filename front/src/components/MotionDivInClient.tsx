"use client"

import {motion, MotionProps} from "motion/react"
import {ReactNode} from "react";

type Props = {
    isImg: boolean
    children: ReactNode
} & MotionProps

export const MotionDivInClient = ({isImg = false, children, ...props}: Props) => {
    return (
        <motion.div
            className={isImg? "absolute w-screen! h-full! object-cover after:pointer-events-none  ": ""}
            {...props}
        >
            {children}
        </motion.div>
    )
}