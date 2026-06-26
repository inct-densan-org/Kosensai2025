import {Metadata} from "next";
import {Suspense} from "react";
import Loading from "@/components/Loading";

export const metadata: Metadata = {
    title: "キャンパスカミングデー2026 - 一関工業高等専門学校",
    description: "2026年6月27日に行われるキャンパスカミングデー用の特設ページです。",
    authors: {},
    openGraph: {
        type: "website",
        locale: "ja_JP",
        images: [{
            url: "https://www.ichinoseki.ac.jp/files/63bdc0c003c6ce281314e90d4a55c9f30.jpg",
            width: 512,
            height: 512
        }],
        title: "キャンパスカミングデー2026 - 一関工業高等専門学校 ",
        siteName: "一関工業高等専門学校 R8キャンパスカミングデー",
        description: "2026年6月27日に行われるキャンパスカミングデー用の特設ページです。"

    },
    twitter: {
        card: "summary_large_image",
    },
};

export default function CCDMapLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <Suspense fallback={<Loading/>}>
                {children}
            </Suspense>
        </>
    )
}
