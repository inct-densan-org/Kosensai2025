import "./globals.css";
import {DotGothic16} from "next/font/google";
import {ReactNode, Suspense} from "react";
import Loading from "@/components/Loading";
import {Metadata} from "next";


const dotGothic16Font = DotGothic16({
    weight: "400",
    subsets: ["latin"],
    variable: '--font-dot-gothic-16'
})

export const metadata: Metadata = {
    title: "一関工業高等専門学校 高専祭2025",
    description: "一関工業高等専門学校にて開催される第61回高専祭の特設サイトです。10月25日(土)、26日(日)の午前9時から午後5時まで開場しております。ぜひご参加ください。",
    authors: {
        
    },
    openGraph: {
        type: "website",
        locale: "ja_JP",
        images: [{
            url: "/ogp/thumbnail.webp",
            width: 512,
            height: 512
        }],
        title: "一関工業高等専門学校 高専祭2025",
        siteName: "一関工業高等専門学校 高専祭2025",
        description: "一関工業高等専門学校にて開催される第61回高専祭の特設サイトです。10月25日(土)、26日(日)の午前9時から午後5時まで開場しております。ぜひご参加ください。"
        
    },
    twitter: {
        card: "summary_large_image",
    },
    
    
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
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
