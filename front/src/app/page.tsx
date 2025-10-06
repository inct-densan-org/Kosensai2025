import Image from "next/image";
import {LandingLoadAnimation} from "@/components/LandingLoadAnimation";
import {Window} from "@/components/ui/window";
import {M_PLUS_1p, DotGothic16} from "next/font/google";
import { Modal } from "@/components/Modal";
import { MapPinHouseIcon } from "lucide-react";

const dotGothic16Font = DotGothic16({
    weight: "400",
    subsets: ["latin"],
    // display: "auto"
    // display: "auto"
})

export default function Home() {

    
    return (
        // <Suspense fallback={<div className={"bg-dark-background inset-0 h-screen w-screen"}/>}>
        <>
            <LandingLoadAnimation/>
            <main
                className={"relative min-h-screen flex-col items-center justify-between  bg-background bg-no-repeat bg-fixed bg-(image:--mesh-gradient) blur-in-3xl"}>
                {/*className={"flex min-h-screen flex-col items-center justify-between p-24 bg-linear-to-br/hsl from-[hsl(195,90%,91%)] to-[hsl(243,81%,78%)] "}>*/}

                {/*見出しセクション*/}
                <section className={"relative w-screen min-h-screen "}>
                    <Image
                        src={"/top/poster/poster-full-textless.webp"}
                        alt={"ポスター"}
                        fill={true}
                        className={"absolute w-full! h-full! object-cover after:pointer-events-none  "}
                    />
                    <h1 className={dotGothic16Font.className + " drop-shadow-2xl/50 absolute w-full text-center top-5 left-1/2 -translate-x-1/2 text-[min(20vw,20vh)] text-[#f5ff71] tracking-widest font-light"} >高専祭</h1>
                    <p className={dotGothic16Font.className + " drop-shadow-2xl/100 absolute w-full text-center top-60 left-1/2 -translate-x-1/2 text-[min(6vw,6vh)] text-white tracking-widest font-light"} >一関工業高等専門学校</p>
                </section>

                <Window title={"WELCOME!!"} subtitle={"校長挨拶"}>
                    <div className={"min-h-[200px] flex flex-col "}>
                        <div
                            className="w-full h-[100px] left-0 top-[51px]   items-center gap-8 inline-flex">


                            <Image
                                className="rounded-full"
                                width={100}
                                height={100}
                                alt={"president"}
                                src="/top/poster/poster-part-taiyaki-m.webp"
                            />
                            <div
                                className="w-[180px] h-[76px] flex-col justify-between items-start inline-flex lg:w-full">
                                <h3 className=" text-[14px] font-black font-['Mplus 1p'] leading-[17.83px] lg:text-lg">
                                    ようこそ高専祭へ！
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

                        <p className={"inline indent-2 lg:pt-4 text-[.7em] pt-1"}>
                            本校は今年度、創立60周年の記念すべき年であり、例年にも増して多彩な屋台や企画がずらりと並びます。
                        </p>
                        <p className={"inline indent-2 lg:pt-4 text-[.7em] pt-1"}>
                            また、全国高専の中でも強豪と評判のロボコンの活動、科学と触れ合うサイエンスカフェ、学生たちによる地域の課題の解決を目指した取り組みなど、日頃の学生たちの活動成果の展示や発表もあります。学生たちの情熱と創造性をぜひご覧ください。
                        </p>
                        <p className={"inline indent-2 lg:pt-4 text-[.7em] pt-1"}>
                            また、教員の研究発表もあり、先進的な研究を通して科学や工学技術への興味が一層深まることと思います。
                        </p>
                        <p className={"inline indent-2 lg:pt-4 text-[.7em] pt-1"}>
                            高専祭は、本校の教育の成果を発表し、地域の方々との交流を深める絶好の機会でもあります。様々な取り組みや企画など通し、学生たちの明るく熱意あふれる姿をぜひご覧ください。
                        </p>
                        <p className={"inline indent-2 lg:pt-4 text-[.7em] pt-1"}>
                            皆様と一緒に楽しい時間を過ごせることを楽しみにしております。
                        </p>
                    </div>
                </Window>
                <Window title={"MESSAGE"} subtitle={"代表挨拶"}>
                    <div className={"min-h-[200px] flex flex-col "}>
                        <div
                            className="w-full h-[100px] left-0 top-[51px]   items-center gap-8 inline-flex">


                            <Image
                                className="rounded-full"
                                width={100}
                                height={100}
                                alt={"president"}
                                src="/top/poster/poster-part-taiyaki-m.webp"
                            />
                            <div
                                className="w-[180px] h-[76px] flex-col justify-between items-start inline-flex lg:w-full">
                                <h3 className=" text-[14px] font-black font-['Mplus 1p'] leading-[17.83px] lg:text-lg">
                                    「褪せない思い出」を。
                                </h3>
                                <div>                        <span
                                    className=" text-[10px] font-normal font-['Mplus 1p'] leading-[7.43px] lg:text-xs lg:leading-8">
                          実行委員長
                          <br/>
                        </span>
                                    <span
                                        className=" text-[12px] font-normal font-['Mplus 1p'] leading-[10.40px] lg:text-base">4C 高橋 一玄</span>
                                </div>
                            </div>
                        </div>

                        <p className={"inline indent-2 lg:pt-4 text-[.7em] pt-1"}>
                            今年度の高専祭実行委員長を務めます、4年化学バイオ系の高橋一玄です。
                        </p>
                        <p className={"inline indent-2 lg:pt-4 text-[.7em] pt-1"}>
                            この度、一大イベントである高専祭を2024年10月26日(土)＆10月27日(日)に開催することとなりました。
                        </p>
                        <p className={"inline indent-2 lg:pt-4 text-[.7em] pt-1"}>
                            今年度は昨年度と同様，来場者数の制限をなくしての開催となります。高専ならではの特徴が詰まった企画や展示，発表など，学生だけでなく、来場者の皆様にも楽しんでいただけるようなイベントをご用意しております。
                        </p>
                        <p className={"inline indent-2 lg:pt-4 text-[.7em] pt-1"}>
                            「〜lasting memory〜
                            もう一回のない高専祭」というテーマのもと、皆様の褪せない思い出になれるよう尽力いたします。
                        </p>
                        <p className={"inline indent-2 lg:pt-4 text-[.7em] pt-1"}>
                            昨年とはまた違った高専祭をお楽しみください！
                        </p>
                        <p className={"inline indent-2 lg:pt-4 text-[.7em] pt-1"}>
                            最後に、高専祭を開催するにあたり協賛していただいた企業様、協力していただいた学生、教職員の皆様に感謝を申し上げます。
                        </p>
                    </div>
                </Window>

            </main>
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
