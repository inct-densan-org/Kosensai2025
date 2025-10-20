import { AnimatedContentSection } from "@/components/top/AnimatedContentSection";
import Link from "next/link";

const ScheduleRow = ({ time, event, organizationPath }: { time: string; event: string; organizationPath?: string }) => (
    <Link href={organizationPath ? `/events/${organizationPath}` : "#"} className={`flex border-t border-white/20 py-3 ${organizationPath ? "hover:bg-white/10 cursor-pointer" : ""}`}>
        <div className="w-1/3 text-light-gold">{time}</div>
        <div className="w-2/3">{event}</div>
    </Link>
);

export default function EventsPage() {
    const firstGymSchedule = {
        day1: [
            { time: "9:00~15:30", event: "軽音楽部", organizationPath: "bands" },
            { time: "15:30~17:00", event: "ダンス部", organizationPath: "dance" },
            { time: "17:00~19:00", event: "カラオケ発表 (中夜祭)" },
        ],
        day2: [
            { time: "9:00~15:30", event: "軽音楽部", organizationPath: "bands" },
            { time: "15:30~16:30", event: "電子計算機部 DJ", organizationPath: "computer-club-dj" },
            { time: "16:30~18:00", event: "有志発表", organizationPath: "volunteer-stage" },
            { time: "18:00~19:00", event: "花火 (後夜祭)" },
        ],
    };

    const secondGymSchedule = {
        day1: [
            { time: "10:30~11:30", event: "吹奏楽部", organizationPath: "brass-band" },
            { time: "12:00~12:30", event: "よさこい部", organizationPath: "yosakoi" },
            { time: "13:00~17:00", event: "機械技術部", organizationPath: "mechanical-tech" },
        ],
        day2: [
            { time: "9:00~11:00", event: "機械技術部", organizationPath: "mechanical-tech" },
            { time: "12:00~12:30", event: "よさこい部", organizationPath: "yosakoi" },
            { time: "14:00~14:50", event: "○×ゲーム" },
        ],
    };

    return (
        <AnimatedContentSection title="イベントスケジュール" sensibility={.2} className={"text-white"}>
            <div className="flex flex-col gap-8 text-left max-w-4xl px-4 mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-center">高専祭 イベントスケジュール</h2>

                {/* 第一体育館 */}
                <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-3xl font-bold mb-6 text-center">第一体育館</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-semibold mb-4 text-center border-b border-white/30 pb-2">10月25日 (土)</h4>
                            <div className="flex flex-col">
                                {firstGymSchedule.day1.map((item, index) => <ScheduleRow key={index} {...item} />)}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-4 text-center border-b border-white/30 pb-2">10月26日 (日)</h4>
                            <div className="flex flex-col">
                                {firstGymSchedule.day2.map((item, index) => <ScheduleRow key={index} {...item} />)}
                            </div>
                        </div>
                    </div>
                     <p className="text-xs text-center mt-4 text-white/70">※17時以降は、本校学生以外はご参加いただけません。</p>
                </div>

                {/* 第二体育館 */}
            </div>
        </AnimatedContentSection>
    );
}
