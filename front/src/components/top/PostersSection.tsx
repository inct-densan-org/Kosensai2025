'use client'

import {useState} from "react";
import {Posters} from "@/components/top/Posters";
import Image from "next/image";
import {FadeInWhenVisible} from "@/components/top/FadeInWhenVisible";
import {dotGothic16Font} from "@/app/layout";
import {postersData} from "@/posters.data";
import {useIsMobile} from "@/utils/useIsMobile";

export function PostersSection() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const isMobile = useIsMobile()

    const selectedPoster = postersData[selectedIndex];

    return (
        <section
            className={"h-fit lg:h-dvh bg-black drop-shadow-xl drop-shadow-black relative lg:flex lg:items-center lg:flex-row  "}>

            {/* スマホ用テキスト */}
            <div className="lg:hidden absolute h-full w-full top-0 left-1/2 translate-x-[-50%] flex flex-col  justify-start items-center text-center text-white">
                <FadeInWhenVisible>
                    <h2 className={dotGothic16Font.className + " block mt-auto text-[5vh]"}>屋台・自主企画・系展示</h2>
                </FadeInWhenVisible>

                <FadeInWhenVisible>
                    
                    <div className={dotGothic16Font.className + "block  mt-auto text-[2vh]"}>09:00 ~ 17:00</div>
                </FadeInWhenVisible>
                <FadeInWhenVisible>
                    <div className={dotGothic16Font.className + "block  mt-auto text-[2vh]"}>ポスターをタップで詳細を表示</div>
                </FadeInWhenVisible>
            </div>

            <div
                className="w-full lg:w-2/3 flex items-center justify-center drag-none h-full lg:min-w-[500px] lg:w-auto lg:shrink ">
                <Posters onSelectedIndexChange={setSelectedIndex}/>
            </div>
            <div
                className="hidden lg:flex lg:w-1/3 ml-4 border-l-[1px] border-white h-full text-white  flex-col justify-center items-center lg:grow ">
                {/*右側の画像*/}
                <div className=" w-full h-2/3 items-center justify-center">
                    <div className="relative w-[400px] h-[600px]">
                        {!isMobile && selectedPoster && selectedPoster.images && selectedPoster.images.length > 0 && (
                            <Image
                                src={selectedPoster.images[0]}
                                alt={selectedPoster.title}
                                fill={true}
                                sizes="200px"
                                className="object-contain"
                            />
                        )}
                    </div>
                </div>

                {/* PC用テキスト */}
                <div className="hidden lg:flex flex-col h-1/3 justify-start items-center pt-8 px-4">
                    {selectedPoster && (
                        <FadeInWhenVisible>
                            <h2 className={dotGothic16Font.className + " block text-xl font-bold"}>{selectedPoster.title}</h2>
                            <p className="whitespace-pre-wrap text-sm mt-4">{selectedPoster.desc}</p>
                        </FadeInWhenVisible>
                    )}
                </div>
            </div>
        </section>
    )
}
