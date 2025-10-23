import { Suspense } from "react";
import ScrollContextProvider from "@/components/top/ScrollContextProvider";
import Navigation from "@/components/top/Navigation";
import Scroller from "@/components/top/Scroller";

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className={" relative w-screen min-h-dvh h-auto flex-col pt-16 overflow-x-hidden overflow-y-auto items-center justify-between bg-[#0072C3] bg-no-repeat bg-(image:--mesh-gradient) blur-in-3xl hidden-scrollbar"}>
                <Navigation/>
                {children}
        </main>
    );
}
