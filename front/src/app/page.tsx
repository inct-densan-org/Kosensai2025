import {LandingLoadAnimation} from "@/components/top/LandingLoadAnimation";
import Scroller from "@/components/top/Scroller";
import {ChairmanMessage, PrincipalMessage} from "@/components/top/Messages";
import {News} from "@/components/top/News";
import Navigation from "@/components/top/Navigation";
import {MessagesWrapper} from "@/components/top/MessageWrapper";
import {Hero} from "@/components/top/Hero";
import {PostersSection} from "@/components/top/PostersSection";


export default function Home() {


    return (
        // <Suspense fallback={<div className={"bg-dark-background inset-0 h-screen w-screen"}/>}>
        <>
            <LandingLoadAnimation/>

            <main
                className={"relative w-screen min-h-dvh flex-col overflow-x-hidden  items-center justify-between  bg-[#0072C3] bg-no-repeat  bg-(image:--mesh-gradient) blur-in-3xl hidden-scrollbar"}

            >
                {/*className={"flex min-h-screen flex-col items-center justify-between p-24 bg-linear-to-br/hsl from-[hsl(195,90%,91%)] to-[hsl(243,81%,78%)] "}>*/}

                {/*ヒーローセクション*/}
                <section className={"scroll-section relative w-full min-h-screen overflow-hidden "}>

                    <Hero/>

                </section>

                <div className={"scroll-section overflow-y-auto relative h-dvh hidden-scrollbar w-full"}>
                    <Navigation/>
                    <section
                        className={"w-full overflow-x-hidden h-dvh pt-12 translate-y-[-64px] md:flex md:flex-row  "}>
                        <MessagesWrapper>
                            <PrincipalMessage/>
                            <ChairmanMessage/>
                        </MessagesWrapper>
                        <News/>
                    </section>
                    <PostersSection/>
                </div>
                <div className={"scroll-section overflow-y-auto relative h-dvh hidden-scrollbar w-full"}>
                    <section
                        className={"w-full overflow-x-hidden h-dvh pt-12 translate-y-[-64px] flex items-center justify-center text-white"}>
                        <h2 className="text-4xl font-bold">フリーWi-Fiの提供について</h2>
                    </section>

                    <section
                        className={"w-full overflow-x-hidden h-dvh pt-12 translate-y-[-64px] flex items-center justify-center text-white"}>
                        <h2 className="text-4xl font-bold">アクセス/雨天時の対応</h2>
                    </section>
                </div>
                
            </main>
            <Scroller/>
        </>
        // </Suspense>
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
