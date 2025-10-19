'use client'
import {postersData} from "@/posters.data";
import {PosterCarousel} from "@/components/top/PosterCarousel";
import {PosterCarouselSP} from "@/components/top/PosterCarousel-sp";
import {useEffect, useState} from "react";

export function Posters({onSelectedIndexChange}: { onSelectedIndexChange: (index: number) => void }) {
    const [isMounted, setIsMounted] = useState(false);
    const [isPc, setIsPc] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => {
            setIsPc(window.innerWidth >= 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // To prevent hydration mismatch, we only render the carousel on the client after mounting.
    if (!isMounted) {
        return null;
    }

    const posters = postersData.map((e, index) => ({
        id: index,
        title: e.title,
        desc: e.desc,
        images: (e.images && e.images.length > 0) ? e.images : [],
    }));

    if (isPc) {
        return <PosterCarousel posters={posters} onSelectedIndexChange={onSelectedIndexChange}/>;
    } else {
        // @ts-ignore
        return <PosterCarouselSP posters={posters}/>;
    }
}
