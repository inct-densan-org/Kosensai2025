import {Suspense} from "react";
import {LandingLoadAnimation} from "@/components/top/LandingLoadAnimation";
import Loading from "@/components/Loading";

export default function KosensaiLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <LandingLoadAnimation/>
            <Suspense fallback={<Loading/>}>
                {children}
            </Suspense>
        </>
    )
}
