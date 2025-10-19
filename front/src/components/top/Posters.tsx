'use client'
import {postersData} from "@/posters.data";
import {PosterCarousel} from "@/components/top/PosterCarousel";
import {PosterCarouselSP} from "@/components/top/PosterCarousel-sp";
import {useEffect, useState} from "react";

export function Posters({onSelectedIndexChange}: { onSelectedIndexChange: (index: number) => void }) {
    const [isPc, setIsPc] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsPc(window.innerWidth >= 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    if (isPc) {
        const postersForPc = postersData.map((e, index) => ({
            id: index,
            title: e.title,
            desc: e.desc,
            imagePath: (e.images && e.images.length > 0) ? e.images[0] : "",
        }));
        return <PosterCarousel posters={postersForPc} onSelectedIndexChange={onSelectedIndexChange}/>;
    } else {
        const postersForSp = postersData.map((e, index) => ({
            id: index,
            title: e.title,
            image: (e.images && e.images.length > 0) ? e.images[0] : "",
        }));
        // @ts-ignore
        return <PosterCarouselSP posters={postersForSp}/>;
    }
}
