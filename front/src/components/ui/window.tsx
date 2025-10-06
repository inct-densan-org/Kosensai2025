import {ReactElement} from "react";

export function Window({title, children, subtitle}: {title: string, children: ReactElement,  subtitle?: string}) {
    return (
        <div className={"border-black border-[1px] rounded-sm m-8 w-auto h-fit bg-[rgba(255,255,255,0.5)]  text-foreground   font-['Mplus 1p'] "}>
            {/*上部のフチ*/}
            <div className={"px-3 w-full py-1/2 h-7 bg-  rounded-t-sm border-b-black border-[1px] font-bold flex flex-row items-end gap-2"}>
                <h3>{title}</h3>
                {subtitle && <p className={"pb-[.2em] pl-2%] text-[.6em] font-normal"}>{subtitle}</p>}
            </div>
            
            {/*コンテンツ*/}
            <div className={"px-4 pt-2 pb-4 text-[.8rem]"}>
            {children}
                
            </div>
        </div>
    )
}