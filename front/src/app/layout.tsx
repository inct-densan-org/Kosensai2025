import "./globals.css";
import GrainyFilter from "@/components/GrainyFilter";
import {DotGothic16} from "next/font/google";


const dotGothic16Font = DotGothic16({
    weight: "400",
    subsets: ["latin"],
})
export {dotGothic16Font}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" className={"overflow-x-hidden hidden-scrollbar"}>
        <body>
        {children}
        </body>
        </html>
    );
}
