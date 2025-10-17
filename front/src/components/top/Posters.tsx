'use client'
import {PosterCarousel} from "./PosterCarousel";
import {Modal} from "@/components/Modal";
import Image from "next/image";
import {postersData} from "@/components/top/posters.data";
import {useEffect, useState} from "react";

export function Posters({ onSelectedIndexChange }: { onSelectedIndexChange: (index: number) => void }) {
    const [isPc, setIsPc] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsPc(window.innerWidth >= 1024); // Tailwind's lg breakpoint
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const posters = postersData.map((e, index) => {
        return {
            id: index, // Use index as unique ID
            title: e.title,
            desc: e.desc,
            images: (e.images || []).map((path) => {
                const imageElement = (
                    <Image
                        src={path}
                        alt={path}
                        fill={true}
                        sizes="400px"
                        className="absolute! object-fill! w-full! h-full!"
                    />
                );

                return (
                    <div
                        key={path}
                        className="relative w-[277px] h-[392px] md:w-[400px] md:h-[566px]  bg-gray-200 rounded-lg overflow-hidden shadow-lg select-none drop-shadow-xl drop-shadow-gray-800">
                        {isPc ? (
                            imageElement
                        ) : (
                            <Modal button={imageElement}>
                                <h2 className="text-2xl font-bold">{e.title}</h2>
                                <p className="whitespace-pre-wrap">{e.desc}</p>
                            </Modal>
                        )}
                    </div>
                )
            })
        }
    });

    return (
        <PosterCarousel isModalOpen={false} posters={posters} onSelectedIndexChange={onSelectedIndexChange}/>
    );
}
