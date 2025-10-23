import {Window} from "@/components/ui/window";
import {FadeInWhenVisible} from "@/components/top/FadeInWhenVisible";
import { client } from "@/utils/api-client";
import { NewsList } from "@api/schema";
import Link from "next/link";


export async function News() {
    let data: NewsList[] | null = null;
    let error: Error | null = null; // エラーを保持する変数を追加

    try {
        const res = await client.news.$get();
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        data = (await res.json()).data;
    } catch (e) {
        console.error("Error fetching top news:", e);
        if (e instanceof Error) {
            error = e; // エラーオブジェクトを保持
        }
    }

    // エラーが発生した場合の表示
    if (error) {
        return (
            <FadeInWhenVisible className={""}>
                <Window title={"News"} color={"white"}
                        className={"overflow-y-scroll hidden-scrollbar h-full md:h-[calc(100dvh_-_128px)] md:w-full m-4 mt-8 flex flex-col"}>
                    <div className="p-4 text-red-400">
                        <p className="font-bold">ニュースの読み込みに失敗しました。</p>
                        <p className="mt-2 text-sm text-white/80">エラー: {error.message}</p>
                        <p className="mt-4 text-xs text-white/60">
                            少し時間を置いてから再度お試し下さい。解決しない場合はTeamsでf22092までお知らせ下さい。
                        </p>
                    </div>
                </Window>
            </FadeInWhenVisible>
        )
    }

    if (!data || data.length === 0) {
        data = [{
            id: "1",
            publishedAt: new Date("2025/10/20").toISOString(),
            title: "2025年度版の公式サイトを公開しました！<br/>徐々に情報が追加されていきますのでお見逃しなく！",
            tag: "お知らせ", // 例としてタグを追加
        }];
    }

    return (
        <FadeInWhenVisible className={""}>
            <Window title={"News"} color={"white"}
                    className={"overflow-y-scroll hidden-scrollbar h-full md:h-[calc(100dvh_-_128px)] md:w-full m-4 mt-8 flex flex-col"}>
                <div className="flex-grow">
                    {data.map((news) => (
                        <Link href={`/news/${news.id}`} key={news.id}>
                            <NewsCard
                                day={news.publishedAt ? new Intl.DateTimeFormat('ja-JP').format(new Date(news.publishedAt)) : '日付不明'}
                                title={news.title}
                                tag={news.tag}
                            />
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-4">
                    <Link href="/news" className="text-white hover:underline">
                        NEWS一覧へ
                    </Link>
                </div>
            </Window>
        </FadeInWhenVisible>
    )
}

function NewsCard({day, title, tag}: { day: string, title: string, tag: string | null }) {
    return (
        <div className={"z-[100] flex flex-col justify-start items-start  border-t-[1px] border-white first:border-none py-2 cursor-pointer hover:bg-white/10"}>
            <div className={"flex justify-start items-center w-full gap-2"}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.28742 8.04587L8.04575 7.28754L6.04158 5.28337V2.79171H4.95825V5.71671L7.28742 8.04587ZM5.49992 10.9167C4.75061 10.9167 4.04645 10.7745 3.38742 10.4901C2.72839 10.2058 2.15513 9.81983 1.66763 9.33233C1.18013 8.84483 0.794189 8.27157 0.509814 7.61254C0.225439 6.95351 0.083252 6.24935 0.083252 5.50004C0.083252 4.75073 0.225439 4.04657 0.509814 3.38754C0.794189 2.72851 1.18013 2.15525 1.66763 1.66775C2.15513 1.18025 2.72839 0.794311 3.38742 0.509937C4.04645 0.225562 4.75061 0.083374 5.49992 0.083374C6.24922 0.083374 6.95339 0.225562 7.61242 0.509937C8.27145 0.794311 8.84471 1.18025 9.33221 1.66775C9.81971 2.15525 10.2056 2.72851 10.49 3.38754C10.7744 4.04657 10.9166 4.75073 10.9166 5.50004C10.9166 6.24935 10.7744 6.95351 10.49 7.61254C10.2056 8.27157 9.81971 8.84483 9.33221 9.33233C8.84471 9.81983 8.27145 10.2058 7.61242 10.4901C6.95339 10.7745 6.24922 10.9167 5.49992 10.9167ZM5.49992 9.83337C6.70061 9.83337 7.72301 9.41132 8.56711 8.56723C9.4112 7.72313 9.83325 6.70073 9.83325 5.50004C9.83325 4.29935 9.4112 3.27695 8.56711 2.43285C7.72301 1.58876 6.70061 1.16671 5.49992 1.16671C4.29922 1.16671 3.27683 1.58876 2.43273 2.43285C1.58863 3.27695 1.16659 4.29935 1.16659 5.50004C1.16659 6.70073 1.58863 7.72313 2.43273 8.56723C3.27683 9.41132 4.29922 9.83337 5.49992 9.83337Z"
                        fill="white"/>
                </svg>
                <p>{day}</p>
                {tag && (
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-500 text-white">{tag}</span>
                )}
            </div>
            <p className={"w-full text-[1em] leading-[1.3em] mt-1 ml-[1em]"}
               dangerouslySetInnerHTML={{ __html: title }}
            />
        </div>
    )
}
