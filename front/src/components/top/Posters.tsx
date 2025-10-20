'use client'
import {postersData} from "@/posters.data";
import {PosterCarousel} from "@/components/top/PosterCarousel";
import {PosterCarouselSP} from "@/components/top/PosterCarousel-sp";
import {useEffect, useMemo, useState} from "react";

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
    
    const posters = useMemo(() => postersData.map((e, index) => ({
        id: index,
        title: e.title,
        desc: e.desc,
        images: (e.images && e.images.length > 0) ? e.images : [],
    })), []);
    
    if (!isMounted) {
        return null;
    }

    if (isPc) {
        return <PosterCarousel posters={posters} onSelectedIndexChange={onSelectedIndexChange}/>;
    } else {
        return <PosterCarouselSP posters={posters}/>;
    }
}
