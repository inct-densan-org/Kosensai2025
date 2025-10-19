import Image from "next/image";
import {Window} from "@/components/ui/window";
export function PrincipalMessage() {
    return (
        <Window title={"WELCOME!!"} subtitle={"校長挨拶"} color={"white"} className={"m-4 mt-8"}>
            <div className={"flex flex-col "}>
                <div
                    className="w-full h-[100px] left-0 top-[51px]  items-center gap-8 inline-flex">
                    <Image
                        className="rounded-full object-contain! "
                        width={51}
                        height={51}
                        
                        alt={"校長"}
                        src="/top/principal.webp"
                    />
                    <div
                        className="w-[180px] h-[76px] flex-col justify-between items-start inline-flex lg:w-full">
                        <h3 className=" text-[14px]  font-['Mplus 1p'] leading-[17.83px] lg:text-lg">
                            ようこそ高専祭へ
                        </h3>
                        <div>                        <span
                            className=" text-[10px] font-normal font-['Mplus 1p'] leading-[7.43px] lg:text-xs lg:leading-8">
                          一関高専校長
                          <br/>
                        </span>
                            <span
                                className=" text-[12px] font-normal font-['Mplus 1p'] leading-[10.40px] lg:text-base">小林　淳哉</span>
                        </div>
                    </div>
                </div>

                <p className={"inline indent-2 lg:pt-4 text-[0.875rem] pt-1"}>
                    高専祭は、本校の教育の成果を発表し、地域の方々との交流を深める絶好の機会です。
                </p>
                <p className={"inline indent-2 lg:pt-4 text-[0.875rem] pt-1"}>
                    特に今年の高専祭は、例年にも増して多彩な屋台や企画がずらりと並びます。校内を巡って謎を説く「脱出ゲーム」、お祭りの縁日のような「射的」、全国高専の中でも強豪と評判のロボコンの活動、科学と触れ合うサイエンスカフェ、日頃の学生たちが学んでいる未来を作る専門分野の技術の紹介など、子どもから大人まで楽しめる企画や活動の成果が満載です。そして生き生きとした学生たちの情熱と創造性をぜひご覧ください。
                </p>
                <p className={"inline indent-2 lg:pt-4 text-[0.875rem] pt-1"}>
                    皆様と一緒に楽しい時間を過ごせることを楽しみにしております。
                </p>
            </div>
        </Window>
    )
}

export function ChairmanMessage() {
    return (
        <Window title={"MESSAGE"} subtitle={"代表挨拶"} color={"white"} className={"m-4 mt-8"}>
            <div className={"w-full flex flex-col"}>
                <div
                    className="w-full h-[100px] left-0 top-[51px]   items-center gap-8 inline-flex">

                    <Image
                        className="rounded-full object-contain! "
                        width={51}
                        height={51}
                        alt={"実行委員長"}
                        src="/top/chairman.webp"
                    />
                    <div
                        className="w-[180px] h-[76px] flex-col justify-between items-start inline-flex lg:w-full">
                        <h3 className=" text-[14px]  font-['Mplus 1p'] leading-[17.83px] lg:text-lg">
                            笑顔あふれる高専祭へ
                        </h3>
                        <div>                        <span
                            className=" text-[10px] font-normal font-['Mplus 1p'] leading-[7.43px] lg:text-xs lg:leading-8">
                          実行委員長
                          <br/>
                        </span>
                            <span
                                className=" text-[12px] font-normal font-['Mplus 1p'] leading-[10.40px] lg:text-base">4E 熊谷　星流</span>
                        </div>
                    </div>
                </div>

                <p className={"inline indent-2 lg:pt-4 text-[0.875rem] pt-1"}>
                    今年も多くの皆さまのご協力のもと、10月25日・26日に高専祭を開催できることを嬉しく思います。私たち実行委員会は、来場された皆さまに楽しんでいただけるよう、一つひとつの企画を丁寧に準備してきました。
                </p>
                <p className={"inline indent-2 lg:pt-4 text-[0.875rem] pt-1"}>
                    テーマである「Ignite ― 燃え上がれ情熱」のもと、学生の熱意と創意があふれる二日間となっています。ぜひ高専生の情熱を感じながら、笑顔と感動に包まれる時間をお過ごしください。
                </p>
            </div>
        </Window>
    )
}