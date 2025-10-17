'use client'

import {useState} from "react";
import {Posters} from "@/components/top/Posters";
import Image from "next/image";
import {FadeInWhenVisible} from "@/components/top/FadeInWhenVisible";
import {dotGothic16Font} from "@/app/layout";
import {postersData} from "@/components/top/posters.data";

export function PostersSection() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectedPoster = postersData[selectedIndex];

    return (
        <section
            className={"h-dvh bg-black drop-shadow-xl drop-shadow-black flex items-center"}>
            <div className="w-2/3 flex items-center justify-center drag-none h-full">
                <Posters onSelectedIndexChange={setSelectedIndex}/>
            </div>
            <div
                className="w-1/3 ml-4 border-l-[1px] border-white h-full text-white flex flex-col justify-center items-center">

                {/* Enlarged poster for lg+ screens */}
                <div className="hidden lg:flex w-full h-2/3 items-center justify-center">
                    <div className="relative w-[200px] h-[283px]">
                        {selectedPoster && selectedPoster.images && selectedPoster.images.length > 0 && (
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

                {/* Text for SP screens */}
                <div className="lg:hidden flex flex-col h-full justify-center items-center">
                    <FadeInWhenVisible>
                        <h2 className={dotGothic16Font.className + " block [writing-mode:vertical-rl] mt-auto text-[5vh]"}>屋台・自主企画</h2>
                    </FadeInWhenVisible>

                    <FadeInWhenVisible>
                        <div className={"block [writing-mode:vertical-rl] mt-auto text-[2vh]"}>下へ→</div>
                    </FadeInWhenVisible>
                </div>

                {/* Text for LG+ screens */}
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
