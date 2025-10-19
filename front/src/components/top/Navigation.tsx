import ScrollToTop from "@/components/top/ScrollToTop";


export default function Navigation() {
    return (
        <nav
            className={"fixed h-12 w-[calc(100%-32px)] mx-4 mt-dvh top-2 z-[201]  backdrop-blur-lg mt-4 border-white border-[1px] rounded-xl flex items-center px-4 gap-2 justify-around "}>
            <a className={" text-md tracking-wider text-white"}
            ><ScrollToTop>HOME</ScrollToTop></a>
            <a className={" text-sm tracking-widest text-white "}>NEWS</a>
            <a className={" text-sm tracking-widest text-gray-400"}>SHOPS</a>
            <a href={"/map"} className={" text-sm tracking-widest text-gray-400"}>MAP</a>
            <a className={" text-sm tracking-wide text-gray-400"}>EVENTS</a>
        </nav>
    )
}

