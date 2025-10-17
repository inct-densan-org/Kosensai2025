'use client'
import {PosterCarousel} from "./PosterCarousel";
import {Modal} from "@/components/Modal";
import Image from "next/image";
import {postersData} from "@/components/top/posters.data";

export function Posters({ onSelectedIndexChange }: { onSelectedIndexChange: (index: number) => void }) {

    const posters = postersData.map((e, index) => {
        return {
            id: index, // Use index as unique ID
            title: e.title,
            desc: e.desc,
            images: (e.images || []).map((path) => (
                <div
                    key={path}
                    className="relative w-[277px] h-[392px] md:w-[400px] md:h-[566px]  bg-gray-200 rounded-lg overflow-hidden shadow-lg select-none drop-shadow-xl drop-shadow-gray-800">
                    <Modal button={
                        <Image
                            src={path}
                            alt={path}
                            fill={true}
                            sizes="400px"
                            className="absolute! object-fill! w-full! h-full!"
                        />
                    }>
                        <h2 className="text-2xl font-bold">{e.title}</h2>
                        <p className="whitespace-pre-wrap">{e.desc}</p>
                    </Modal>
                </div>)
            )
        }
    });

    return (
        <PosterCarousel isModalOpen={false} posters={posters} onSelectedIndexChange={onSelectedIndexChange}/>
    );
}
