import {CSSProperties, ReactNode} from "react";


export function Window({title, children, color, subtitle, className}: { title: string, children: ReactNode, color?:CSSProperties["color"] , subtitle?: string, className?: string }) {
    return (
        <div className={"relative  border-white border-[1px] rounded-sm m-8 w-auto font-['Mplus 1p'] md:text-[1.2rem] overflow-y-hidden bg-[rgba(102,102,102,0.15)] backdrop-blur-2xl z-[200] flex flex-col " + className}
        style={{color: color}}>
            {/*上部のフチ*/}
            <div
                className={"px-3 w-full py-1/2 h-7  rounded-t-sm border-b-white border-[1px] font-bold flex flex-row items-end gap-2 text-white"}>
                <h3 className={"md:text-[1.2rem]"}>{title}</h3>
                {subtitle && <p className={"pb-[.2em] pl-[2%] text-[.6em] md:text-[.9rem] md:pb-0 font-normal"}>{subtitle}</p>}
            </div>

            {/*コンテンツ*/}
            <div className={"px-4 pt-2 pb-4 text-[0.875em] leading-[1.5rem] h-full overflow-y-scroll hidden-scrollbar"}>
                {children}
            </div>
        </div>
    )
}