import ScrollToTop from "@/components/top/ScrollToTop";
import {dotGothic16Font} from "@/app/layout";


export default function Navigation() {
    return (
        <nav
            className={"sticky bg-blur-sm h-12 w-auto mx-4 mt-4  top-4 backdrop-blur-sm border-gray-800 border-[1px] rounded-xl flex items-center px-4 gap-2"}>
            <a className={dotGothic16Font.className + " text-md tracking-wide text-foreground mr-auto"}
               ><ScrollToTop>高専祭2025</ScrollToTop></a>
            <a className={dotGothic16Font.className + " text-sm tracking-wide text-foreground "}>NEWS</a>
            <a className={dotGothic16Font.className + " text-sm tracking-wide text-foreground "}>SHOPS</a>
            <a href={"/map"} className={dotGothic16Font.className + " text-sm tracking-wide text-foreground "}>MAP</a>
            <a className={dotGothic16Font.className + " text-sm tracking-wide text-foreground "}>EVENTS</a>
        </nav>
    )
}

