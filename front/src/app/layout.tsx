import "./globals.css";
import {DotGothic16} from "next/font/google";
import {Suspense} from "react";
import Loading from "@/components/Loading";


const dotGothic16Font = DotGothic16({
    weight: "400",
    subsets: ["latin"],
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" className={"overflow-x-hidden hidden-scrollbar"}>
        <body className={dotGothic16Font.className}>
        <Suspense fallback={<Loading/>}>
            {children}
        </Suspense>
        </body>
        </html>
    );
}
