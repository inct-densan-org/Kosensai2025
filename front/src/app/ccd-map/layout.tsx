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
