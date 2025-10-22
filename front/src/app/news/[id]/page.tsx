import {client} from "@/utils/api-client";
import {NewsData} from "@api/schema";
import Link from "next/link";
import Navigation from "@/components/top/Navigation";

export const revalidate = 0;

export default async function HtmlDisplayPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    let news: NewsData | null = null;
    let error: string | null = null;

    try {
        const res = await client.news[":id"].$get({
            param: {
                id
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const {data} = await res.json();
        news = data;

    } catch (e: any) {
        console.error("Error fetching news detail:", e);
        error = e.message || "記事の取得中にエラーが発生しました。";
    }

    const content = () => {
        if (error) {
            return (
                <div className="max-w-4xl mx-auto">
                    <div className="p-3 bg-red-50 text-red-700 rounded">エラー: {error}</div>
                    <div className="text-center mt-8">
                        <Link href="/news" className="text-white hover:underline">
                            お知らせ一覧に戻る
                        </Link>
                    </div>
                </div>
            )
        }

        if (!news) {
            return (
                <div className="max-w-4xl mx-auto">
                    <p>記事が見つかりませんでした。</p>
                    <div className="text-center mt-8">
                        <Link href="/news" className="text-white hover:underline">
                            お知らせ一覧に戻る
                        </Link>
                    </div>
                </div>
            )
        }

        // @ts-ignore
        return (
            <div className="max-w-4xl mx-auto bg-black/20 p-8 rounded-lg">
                <h1 className="text-3xl font-bold mb-2">{news.title}</h1>
                <div className="flex items-center gap-4 mb-4">
                    <p className="text-gray-300">
                        {news.publishedAt ? new Intl.DateTimeFormat('ja-JP').format(new Date(news.publishedAt)) : '日付不明'}
                    </p>
                    {news.tag && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500 text-white">{news.tag}</span>
                    )}
                </div>
                <article
                    className="prose prose-invert max-w-none mt-4"
                    dangerouslySetInnerHTML={{__html: news.body || ""}}
                />
                <div className="text-center mt-8">
                    <Link href="/news" className="text-white hover:underline">
                        お知らせ一覧に戻る
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <Navigation/>
            <main className="text-white p-4 min-h-dvh pt-32 relative w-screen h-auto flex-col overflow-x-hidden overflow-y-auto  items-center justify-between  bg-[#0072C3] bg-no-repeat  bg-(image:--mesh-gradient) blur-in-3xl hidden-scrollbar">
                {content()}
            </main>
        </>

    );
}
