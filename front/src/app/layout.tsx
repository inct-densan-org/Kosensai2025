import "./globals.css";
import {DotGothic16} from "next/font/google";
import {ReactNode} from "react";


const dotGothic16Font = DotGothic16({
    weight: "400",
    subsets: ["latin"],
    variable: '--font-dot-gothic-16'
})


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="ja" className={"overflow-x-hidden hidden-scrollbar"}>
        <body className={dotGothic16Font.className}>
        {children}
        </body>
        </html>
    );
}
