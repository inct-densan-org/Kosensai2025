import {LandingLoadAnimation} from "@/components/top/LandingLoadAnimation";
import {ChairmanMessage, PrincipalMessage} from "@/components/top/Messages";
import {News} from "@/components/top/News";
import Navigation from "@/components/top/Navigation";
import {MessagesWrapper} from "@/components/top/MessageWrapper";
import {Hero} from "@/components/top/Hero";
import {PostersSection} from "@/components/top/PostersSection";
import {Suspense} from "react";
import {AnimatedContentSection} from "@/components/top/AnimatedContentSection";
import Scroller from "@/components/top/Scroller";
import ScrollContextProvider from "@/components/top/ScrollContextProvider";
import {SponsorsSection} from "@/components/top/SponsorsSection";
import Image from "next/image";


export default function Home() {


    return (
        <Suspense fallback={<div className={"bg-dark-background inset-0 h-screen w-screen"}/>}>
            {/*<>*/}
            <LandingLoadAnimation/>

            {/*ヒーローセクション*/}
            <section className={"scroll-section relative w-full min-h-screen overflow-hidden z-[300] "}>
                <Hero/>
            </section>
            <ScrollContextProvider
                className={"scroll-section relative w-screen h-auto flex-col pt-16 overflow-x-hidden overflow-y-auto  items-center justify-between  bg-[#0072C3] bg-no-repeat  bg-(image:--mesh-gradient) blur-in-3xl hidden-scrollbar"}

            >
                <Navigation/>

                <section className={"w-full h-full md:w-1/2  md:float-left"}>
                    <MessagesWrapper>
                        <PrincipalMessage/>
                        <ChairmanMessage/>
                    </MessagesWrapper>
                </section>
                <section
                    className={"md:w-[calc(50%-64px)] md:float-left md:h-[calc(100%-128px)]"}>
                    <News/>
                </section>

                {/*<AnimatedContentSection title="PV" colorReverseAnim={"tb"} className={"h-dvh"}>*/}
                {/*    <h2 className="text-4xl font-bold">PV</h2>*/}
                
                {/*</AnimatedContentSection>*/}

                <section
                    className={"w-full overflow-x-hidden h-dvh "}>
                    <PostersSection/>
                </section>
                <AnimatedContentSection title="注意事項 / フリーWi-Fiの提供について" sensibility={.2} className={"text-white"}>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-left max-w-4xl px-4 mx-auto">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">注意事項について</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>敷地内は禁煙となっております。喫煙はご遠慮ください。</li>
                                <li>ゴミは各所に設置のゴミ箱へお捨てください。分別指示に沿ったゴミ箱に廃棄されますようお願いいたします。</li>
                                <li>(お車でお越しの来場者様へ)
                                    高専祭期間中、構内の車道は一方通行となります。誘導員の指示に従い、徐行をお願いいたします。
                                </li>
                                <li>歩きながらのスマートフォン操作 (歩きスマホ) は危険ですので、ご遠慮ください。</li>
                                <li>荷物や貴重品の管理には十分ご注意ください。落とし物は受付でお預かりいたします。</li>
                                <li>迷子を見かけた際は受付までお知らせください。</li>
                            </ul>
                        </div>
                        <div className="mb-8 md:mb-0">
                            <h3 className="text-2xl font-bold mb-4">フリーWi-Fiの提供について</h3>
                            <p className={"mb-4"}>今年度の高専祭では、有志学生チームによるフリーWi-Fiの提供を行っております！</p>
                            <p>接続に関する情報、及びトラブル時の連絡先につきましては、受付にて配布されますパンフレットの物理媒体、または校内にて掲示中のポスターをご参照くださいませ。</p>
                            <br/>
                            <p className="font-bold">規約</p>
                            <ul className="list-disc list-inside space-y-2 mt-2">
                                <li>Wi-Fiを利用しての法令・公序良俗に反する行為はおやめください。</li>
                                <li>問題行動に対しては、当該機器の通信を遮断する場合がございます。</li>
                                <li>運用上、必要なログやデータの収集を行います。収集したログ・データを利用して情報共有を行う場合は、個人を識別できない形で行います。</li>
                                <li>本ネットワークの利用により発生した損失・損害等につきましては、一切の責任を負いかねます。</li>
                            </ul>
                            <div className={"relative w-full h-auto aspect-square rounded-lg"}>
                                
                            <Image
                                src={"/top/NOCIchinoseki.webp"}
                                alt={"NOCIchinoseki"}
                                fill
                                className="rounded-lg p-4 object-contain"
                            />
                            </div>
                            
                        </div>

                    </div>
                </AnimatedContentSection>

                <AnimatedContentSection title="アクセス" sensibility={.5} className={""}>
                    <div className="w-full max-w-6xl mx-auto px-4">
                        <div className="mb-12 text-center">
                            <h3 className="text-3xl font-bold mb-4">地図</h3>
                            <p className="mb-4">〒021-8511 岩手県一関市萩荘字高梨</p>
                            <div className="w-full max-w-3xl mx-auto">
                                <iframe
                                    className="w-full aspect-video rounded-lg"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6207.984642688949!2d141.107511!3d38.924153!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f88d09d6f0b0357%3A0x7ecc4e362c08f769!2z5LiA6Zai5bel5qWt6auY562J5bCC6ZaA5a2m5qCh!5e0!3m2!1sja!2sus!4v1760887257088!5m2!1sja!2sus"
                                    style={{border: 0}}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                        <div className="mb-12">
                            <h3 className="text-3xl font-bold mb-4 text-center">無料送迎バス</h3>
                            <p className="mb-4 text-center">一関駅 = 一関高専間での無料シャトルバスの運行がございます。ぜひご利用ください。(料金無料)</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <h4 className="text-xl font-bold mb-2 text-center">一ノ関駅西口 発</h4>
                                    <div className="flex flex-wrap justify-center gap-2 text-center">
                                        {["9:20", "10:35", "11:25", "12:35", "13:40", "14:40", "15:40", "16:25", "17:10"].map(time =>
                                            <div key={time} className="bg-white/10 p-2 rounded">{time}</div>)}
                                    </div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <h4 className="text-xl font-bold mb-2 text-center">一関高専 発</h4>
                                    <div className="flex flex-wrap justify-center gap-2 text-center">
                                        {["9:00", "10:10", "11:00", "12:15", "13:30", "14:15", "15:15", "16:05", "16:45"].map(time =>
                                            <div key={time} className="bg-white/10 p-2 rounded">{time}</div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-12">
                            <h3 className="text-3xl font-bold mb-4 text-center">列車時刻表 (一ノ関駅発)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <h4 className="text-lg font-bold mb-2 text-center">東北本線上り<br/>(小牛田・仙台方面)
                                    </h4>
                                    <div className="flex flex-wrap justify-center gap-2 text-center">
                                        {["5:56", "7:00", "7:54", "9:00", "10:39", "12:44", "13:50", "14:41", "15:51", "16:39", "17:42", "18:56", "19:56", "21:06"].map(time =>
                                            <div key={time} className="bg-white/10 p-2 rounded">{time}</div>)}
                                    </div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <h4 className="text-lg font-bold mb-2 text-center">東北本線下り<br/>(花巻・盛岡方面)
                                    </h4>
                                    <div className="flex flex-wrap justify-center gap-2 text-center">
                                        {["5:32", "6:02", "6:43", "7:30", "8:55", "10:15", "11:30", "12:46", "13:45", "14:42", "15:44", "16:27", "17:21", "18:27", "19:38", "20:29", "21:17", "22:13"].map(time =>
                                            <div key={time} className="bg-white/10 p-2 rounded">{time}</div>)}
                                    </div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <h4 className="text-lg font-bold mb-2 text-center">大船渡線<br/>(気仙沼方面)</h4>
                                    <div className="flex flex-wrap justify-center gap-2 text-center">
                                        {["5:41", "7:18", "10:18", "12:46", "14:40", "16:34", "18:41", "20:35"].map(time =>
                                            <div key={time} className="bg-white/10 p-2 rounded">{time}</div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl font-bold mb-4">雨天時の対応</h3>
                            <p>雨天時も高専祭は開催されますが、一部の屋外企画が変更または中止になる場合があります。<br/>詳細は当サイトまたは公式SNSでご確認ください。
                            </p>
                        </div>
                    </div>
                </AnimatedContentSection>
                <section
                    className={"w-full overflow-x-hidden min-h-dvh py-12 flex items-center justify-center text-white"}>
                    <SponsorsSection />
                </section>
                <section
                    className={"w-full overflow-x-hidden h-dvh pt-12  flex  flex-col items-center justify-center text-[#666666] "}>
                    <h2 className="text-4xl font-bold mb-8">パンフレット</h2>
                    <p className="text-4xl font-bold">Coming Soon...</p>
                </section>
                {/*</div>*/}
                {/*<div className={"overflow-y-auto relative h-dvh hidden-scrollbar w-full"}>*/}

                {/*</div>*/}

            </ScrollContextProvider>
            <Scroller/>
            {/*</>*/}
        </Suspense>
    );

    // モーダル使用例
    // return (
    //   <div className="p-10">
    //     {/* ボタンはコンポーネントに埋めてあるので、こちらからは中身のみ渡す */}
    //     <Modal button={<MapPinHouseIcon/>}>
    //       <li>hoge</li>
    //       <li>huga</li>
    //       <li>poo</li>
    //     </Modal>
    //   </div>
    // );
}
