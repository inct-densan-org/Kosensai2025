import { AnimatedContentSection } from "@/components/top/AnimatedContentSection";
import Link from "next/link";

// データ構造
const organizationDetails: { [key: string]: { name: string; description: string; schedule: { time: string; location: string; }[] } } = {
    "bands": {
        name: "軽音楽部",
        description: "両日ともに第一体育館で演奏します。熱いライブをぜひご覧ください！",
        schedule: [
            { time: "10月25日(土) 9:00~15:30", location: "第一体育館" },
            { time: "10月26日(日) 9:00~15:30", location: "第一体育館" },
        ],
    },
    "brass-band": {
        name: "吹奏楽部",
        description: "第二体育館で演奏会を行います。美しい音色をお楽しみください。",
        schedule: [
            { time: "10月25日(土) 10:30~11:30", location: "第二体育館" },
        ],
    },
    "dance": {
        name: "ダンス部",
        description: "第一体育館のステージでパワフルなダンスを披露します。",
        schedule: [
            { time: "10月25日(土) 15:30~17:00", location: "第一体育館" },
        ],
    },
    "yosakoi": {
        name: "よさこい",
        description: "専攻科棟前で迫力のある演舞を披露します。雨天時は第二体育館で行います。",
        schedule: [
            { time: "10月25日(土) 12:00~12:30", location: "専攻科棟前" },
            { time: "10月26日(日) 12:00~12:30", location: "専攻科棟前 (雨天時: 第二体育館)" },
        ],
    },
    "computer-club-dj": {
        name: "電子計算機部 DJ",
        description: "第一体育館がクラブハウスに！DJパフォーマンスをお楽しみください。",
        schedule: [
            { time: "10月26日(日) 15:30~16:30", location: "第一体育館" },
        ],
    },
    "volunteer-stage": {
        name: "有志発表",
        description: "学生有志による様々なパフォーマンスが繰り広げられます。",
        schedule: [
            { time: "10月26日(日) 16:30~18:00", location: "第一体育館" },
        ],
    },
    "mechanical-tech": {
        name: "機械技術部",
        description: "第二体育館で活動内容の展示やデモンストレーションを行います。",
        schedule: [
            { time: "10月25日(土) 13:00~17:00", location: "第二体育館" },
            { time: "10月26日(日) 9:00~11:00", location: "第二体育館" },
        ],
    },
    "i-scream": {
        name: "I scream!",
        description: "専攻科棟前で叫びフェスを開催！豪華景品も用意しています。",
        schedule: [
            { time: "10月26日(日) 11:00~12:00", location: "専攻科棟前" },
        ],
    },
};

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
            <div className="flex flex-col gap-8 text-left max-w-4xl px-4 mx-auto">
                <div className="bg-white/10 rounded-2xl p-8 shadow-lg">
                    <h3 className="text-4xl font-bold mb-4 text-center text-light-gold">{details.name}</h3>
                    <p className="text-center text-white/80 mb-8">{details.description}</p>
                    <div className="space-y-4">
                        {details.schedule.map((item, index) => (
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
                        ))}
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
