import { AnimatedContentSection } from "@/components/top/AnimatedContentSection";
import { firstGymSchedule, secondGymSchedule, advancedCourseBuildingSchedule } from "@/events.data";
import Link from "next/link";

const ScheduleRow = ({ time, event, organizationPath }: { time: string; event: string; organizationPath?: string }) => {
    const content = (
        <>
            <div className="w-1/3 text-light-gold">{time}</div>
            <div className="w-2/3 flex justify-between items-center">
                <span>{event}</span>
                {organizationPath && <span className="text-white/50">&gt;</span>}
            </div>
        </>
    );

    if (organizationPath) {
        return (
            <Link href={`/events/${organizationPath}`} className="flex border-t border-white/20 py-3 hover:bg-white/10 cursor-pointer">
                {content}
            </Link>
        );
    }

    return (
        <div className="flex border-t border-white/20 py-3 cursor-default">
            {content}
        </div>
    );
};

export default function EventsPage() {
    return (
        <AnimatedContentSection title="イベントスケジュール" sensibility={.2} className={"text-white mt-4 pb-32"}>
            <div className="flex flex-col gap-8 text-left max-w-4xl px-4 mx-auto">

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
                <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-3xl font-bold mb-6 text-center">第二体育館</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-semibold mb-4 text-center border-b border-white/30 pb-2">10月25日 (土)</h4>
                            <div className="flex flex-col">
                                {secondGymSchedule.day1.map((item, index) => <ScheduleRow key={index} {...item} />)}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-4 text-center border-b border-white/30 pb-2">10月26日 (日)</h4>
                            <div className="flex flex-col">
                                {secondGymSchedule.day2.map((item, index) => <ScheduleRow key={index} {...item} />)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 専攻科棟前 */}
                <div className="bg-white/10 rounded-2xl p-6 shadow-lg mb-36">
                    <h3 className="text-3xl font-bold mb-6 text-center">専攻科棟前</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-semibold mb-4 text-center border-b border-white/30 pb-2">10月25日 (土)</h4>
                            <div className="flex flex-col">
                                {advancedCourseBuildingSchedule.day1.map((item, index) => <ScheduleRow key={index} {...item} />)}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-4 text-center border-b border-white/30 pb-2">10月26日 (日)</h4>
                            <div className="flex flex-col">
                                {advancedCourseBuildingSchedule.day2.map((item, index) => <ScheduleRow key={index} {...item} />)}
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-center mt-4 text-white/70">※雨天時は第二体育館で実施します。</p>
                </div>
            </div>
        </AnimatedContentSection>
    );
}
