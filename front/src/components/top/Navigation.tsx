import ScrollToTop from "@/components/top/ScrollToTop";
import {dotGothic16Font} from "@/app/layout";


export default function Navigation() {
    return (
        <nav
            className={"sticky h-12 w-[calc(100%-32px)] mx-4 mt-dvh top-2 z-[201]  backdrop-blur-lg mt-4 border-white border-[1px] rounded-xl flex items-center px-4 gap-2 justify-around "}>
            <a className={dotGothic16Font.className + " text-md tracking-wider text-white"}
            ><ScrollToTop>HOME</ScrollToTop></a>
            <a className={dotGothic16Font.className + " text-sm tracking-widest text-white "}>NEWS</a>
            <a className={dotGothic16Font.className + " text-sm tracking-widest text-white "}>SHOPS</a>
            <a href={"/map"} className={dotGothic16Font.className + " text-sm tracking-widest text-white "}>MAP</a>
            <a className={dotGothic16Font.className + " text-sm tracking-wide text-white "}>EVENTS</a>
        </nav>
    )
}

