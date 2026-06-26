import {ReactNode, Suspense} from "react";
import {LandingLoadAnimation} from "@/components/top/LandingLoadAnimation";
import Loading from "@/components/Loading";
import {Metadata} from "next";
export const metadata: Metadata = {
    title: "一関工業高等専門学校 高専祭2025",
    description: "一関工業高等専門学校にて開催される第61回高専祭の特設サイトです。10月25日(土)、26日(日)の午前9時から午後5時まで開場しております。ぜひご参加ください。",
    authors: {

    },
    openGraph: {
        type: "website",
        locale: "ja_JP",
        images: [{
            url: "https://kosensai.ichinoseki.ac.jp/ogp/thumbnail.webp",
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
