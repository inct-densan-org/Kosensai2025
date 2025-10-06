import {dotGothic16Font} from "@/app/layout";
import { Link as Scroll } from 'react-scroll';

export default function Navigation() {
    return (
        <nav
            className={"sticky block bg-blur-sm h-12 w-auto mx-4 mt-4  top-4 backdrop-blur-sm border-gray-800 border-[1px] rounded-xl flex items-center px-4 gap-2"}>
            <Scroll to={"hero"} className={dotGothic16Font.className + " text-md tracking-wide text-foreground mr-auto " }>高専祭2025</Scroll>
            <a className={dotGothic16Font.className + " text-sm tracking-wide text-foreground " }>SHOPS</a>
            <a href={"/map"} className={dotGothic16Font.className + " text-sm tracking-wide text-foreground " }>MAP</a>
            <a className={dotGothic16Font.className + " text-sm tracking-wide text-foreground " }>EVENTS</a>
        </nav>
    )
}