'use client'

import {useState} from "react";
import {Posters} from "@/components/top/Posters";
import {FadeInWhenVisible} from "@/components/top/FadeInWhenVisible";
import {postersData} from "@/posters.data";
import {useIsMobile} from "@/utils/useIsMobile";

export function PostersSection() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const isMobile = useIsMobile()

    const selectedPoster = postersData[selectedIndex];

    return (
        <section
            className={"h-full lg:h-dvh bg-black drop-shadow-xl drop-shadow-black relative lg:flex lg:items-center lg:flex-row  "}>

            {/* スマホ用テキスト */}
            <div
                className="lg:hidden absolute h-full w-full top-0  left-1/2 pt-16 translate-x-[-50%] flex flex-col justify-start items-center text-center text-white">
                <FadeInWhenVisible>
                    <h2 className={" block mt-auto text-[5vh]"}>屋台・自主企画</h2>
                </FadeInWhenVisible>

                <FadeInWhenVisible>

                    <div className={"block  mt-auto text-[2vh]"}>09:00 ~ 17:00</div>
                </FadeInWhenVisible>
                <FadeInWhenVisible>
                    <div
                        className={"block  mt-auto text-[2vh]"}>ポスターをタップで詳細を表示
                    </div>
                </FadeInWhenVisible>
            </div>

            <div
                className="w-full flex items-center justify-center drag-none h-full lg:min-w-[500px] lg:w-auto lg:shrink ">
                <Posters onSelectedIndexChange={setSelectedIndex}/>
            </div>
            <div
                className="hidden lg:flex lg:w-auto ml-4 pt-24 border-l-[1px] border-white h-full text-white  flex-col justify-center items-center lg:grow ">
                {/*右側の画像*/}
                <div className="w-full h-1/3 flex flex-col items-center justify-start">
                    <FadeInWhenVisible className={"text-center mb-1"}>
                        <h2 className={" block text-[5vh]"}>屋台・自主企画</h2>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible className={"text-center mb-1"}>
                        <div className={" block text-[3vh]"}>09:00 ~ 17:00</div>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible className={"text-center mb-8"}>
                        <div
                            className={" block text-[2vh]"}>← ポスターをスクロールで表示切り替え
                        </div>
                    </FadeInWhenVisible>
                    {/*<div className="relative w-[400px] h-[600px] mx-auto">*/}
                    {/*    {!isMobile && selectedPoster && selectedPoster.images && selectedPoster.images.length > 0 && (*/}
                    {/*        <Image*/}
                    {/*            src={selectedPoster.images[0]}*/}
                    {/*            alt={selectedPoster.title}*/}
                    {/*            fill={true}*/}
                    {/*            sizes="200px"*/}
                    {/*            className="object-contain"*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*</div>*/}
                </div>

                {/* PC用テキスト */}
                <div className="hidden lg:flex flex-col h-2/3 justify-start items-center pt-8 px-4">
                    {selectedPoster && (
                        <FadeInWhenVisible>
                            <h2 className={" block font-bold text-center mb-8 text-[4vh]"}>{selectedPoster.title}</h2>
                            {
                                selectedPoster.desc &&
                                <p className={" whitespace-pre-wrap text-center text-[2vh] mt-4"}>"{selectedPoster.desc}"</p>
                            }
                        </FadeInWhenVisible>
                    )}
                    <button className={" block ml-auto mt-auto mb-4 text-right text-[2vh] text-gray-500"}>マップで見る &gt; </button>
                </div>
            </div>
        </section>
    )
}
