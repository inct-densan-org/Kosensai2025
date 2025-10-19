'use client';

import Image from "next/image";
import { Modal } from "@/components/Modal";

// The data structure for a poster
type Poster = {
    id: number;
    title: string;
    desc: string;
    images: string[]; // Array of image paths
};

interface PosterCardProps {
    poster: Poster;
    modalDisabled?: boolean;
}

export function PosterCard({ poster, modalDisabled = false }: PosterCardProps) {
    // Do not render if there are no images
    if (!poster.images || poster.images.length === 0) {
        return null;
    }

    const PosterImage = () => (
        <Image
            src={poster.images[0]} // Use the first image as the trigger
            alt={poster.title}
            fill={true}
            sizes="(max-width: 768px) 277px, 400px"
            className="absolute! object-fill! w-full! h-full!"
            draggable={false}
        />
    );

    return (
        <div
            className="relative w-[277px] h-[392px] md:w-[400px] md:h-[566px] bg-gray-200 rounded-lg overflow-hidden shadow-lg select-none drop-shadow-xl drop-shadow-gray-800">
            {modalDisabled ? (
                <PosterImage />
            ) : (
                <Modal button={<PosterImage />} title={poster.title}>
                    <p className="whitespace-pre-wrap">{poster.desc}</p>
                    {/* A simple gallery for other images */}
                    {poster.images.length > 1 && (
                        <div className="flex mt-4 space-x-2 overflow-x-auto">
                            {poster.images.slice(1).map((img, index) => (
                                <Image key={index} src={img} alt={`${poster.title} - image ${index + 2}`} width={100} height={100} className="object-cover rounded" />
                            ))}
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
}
