'use client'
import Image from "next/image";
import {postersData} from "@/posters.data";
import {PosterCarousel} from "@/components/top/PosterCarousel";

export function Posters({ onSelectedIndexChange }: { onSelectedIndexChange: (index: number) => void }) {

    // Map the data to a structure that PosterCarousel can use.
    // We are only passing the data, not the components themselves.
    const posters = postersData.map((e, index) => ({
        id: index, // Use index as unique ID
        title: e.title,
        desc: e.desc,
        imagePath: (e.images && e.images.length > 0) ? e.images[0] : "", // Pass only the image path
    }));

    return (
        <PosterCarousel posters={posters} onSelectedIndexChange={onSelectedIndexChange}/>
    );
}
