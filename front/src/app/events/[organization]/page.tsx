import { AnimatedContentSection } from "@/components/top/AnimatedContentSection";
import { organizationDetails } from "@/organizations.data";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { organization: string } }): Promise<Metadata> {
    const details = organizationDetails[params.organization];

    if (!details) {
        return {
            title: "団体が見つかりません | 高専祭2025",
        };
    }

    const title = `${details.name} | 高専祭2025`;
    const description = details.description;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    };
}

export default async function OrganizationPage({ params }: { params: Promise<{ organization: string }> }) {
    const details = organizationDetails[(await params).organization];

    if (!details) {
        return (
            <AnimatedContentSection title="団体が見つかりません" sensibility={.2} className={"text-white"}>
                <div className="text-center">
                    <p>指定された団体は見つかりませんでした。</p>
                    <Link href="/events" className="text-blue-300 hover:underline mt-4 inline-block">イベントページに戻る</Link>
                </div>
            </AnimatedContentSection>
        );
    }

    return (
        <AnimatedContentSection title={details.name} sensibility={.2} className={"text-white"}>
            <div className="flex flex-col gap-8 text-left max-w-4xl px-2 mx-auto">
                <div className="bg-white/10 rounded-2xl p-4 shadow-lg">
                    <div className="mb-6">
                        <Link href="/events" className="text-white/80 hover:text-white transition-colors inline-block">
                            &lt; イベント一覧に戻る
                        </Link>
                    </div>
                    <p className="text-center text-white/80 mb-8">{details.description}</p>
                    <div className="space-y-16">
                        {details.bandSchedule ? (
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xl font-semibold mb-4 text-center border-b border-white/30 pb-2">10月25日 (土)</h4>
                                    <div className="flex flex-col gap-4">
                                        {details.bandSchedule[0].map((band, index) => (
                                            <div key={index} className="bg-white/10 p-4 rounded-lg">
                                                <p className="font-semibold text-lg text-light-gold">{band["startAt "].trim()}-{band.endAt.trim()}</p>
                                                <p className="font-bold text-xl mt-1">{band.bandName}</p>
                                                <ul className="list-disc list-inside text-white/80 mt-2">
                                                    {band.songs.map((song, songIndex) => (
                                                        <li key={songIndex} className={"indent-[-1.5em] pl-[1.5em]"}>
                                                            {song === '$SECRET' ? (
                                                                <span className="bg-black text-red-400 px-2 py-1 select-none tracking-widest">SECRET. </span>
                                                            ) : (
                                                                song
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold mb-4 text-center border-b border-white/30 pb-2">10月26日 (日)</h4>
                                    <div className="flex flex-col gap-4">
                                        {details.bandSchedule[1].map((band, index) => (
                                            <div key={index} className="bg-white/10 p-4 rounded-lg">
                                                <p className="font-semibold text-lg text-light-gold">{band["startAt "].trim()}-{band.endAt.trim()}</p>
                                                <p className="font-bold text-xl mt-1">{band.bandName}</p>
                                                <ul className="list-disc list-inside text-white/80 mt-2 pl-2">
                                                    {band.songs.map((song, songIndex) => (
                                                        <li key={songIndex}>
                                                            {song === '$SECRET' ? (
                                                                <span className="bg-black text-red-400 px-2 py-1 select-none tracking-widest">SECRET</span>
                                                            ) : (
                                                                song
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            details.schedule?.map((item, index) => (
                                <div key={index} className="bg-white/10 p-4 rounded-lg flex items-center gap-4">
                                    <div className="w-1/2">
                                        <p className="font-semibold">日時</p>
                                        <p className="text-lg">{item.time}</p>
                                    </div>
                                    <div className="w-1/2">
                                        <p className="font-semibold">場所</p>
                                        <p className="text-lg">{item.location}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="text-center mt-10">
                        <Link href="/events" className="py-3 px-8 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-300 transform hover:scale-105">
                            イベント一覧に戻る
                        </Link>
                    </div>
                </div>
            </div>
        </AnimatedContentSection>
    );
}

// ビルド時に静的なパスを生成するための設定
export async function generateStaticParams() {
    return Object.keys(organizationDetails).map((org) => ({
        organization: org,
    }));
}
