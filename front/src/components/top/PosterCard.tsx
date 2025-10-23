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
    size?:number|null
}

// Define PosterImage outside of PosterCard to prevent it from being re-created on every render.
// This is crucial for performance and preventing re-mounts.
const PosterImage = ({ poster, size=null }: { poster: Poster, size?:number|null }) => (
    <Image
        src={poster.images[0]} // Use the first image as the trigger
        alt={poster.title}
        fill={true}
        sizes={`(max-width: 768px) ${size?`${size}, ${size*400/277}`:"277px, 400px"}`}
        className="absolute! object-fill! w-full! h-full!"
        draggable={false}
    />
);

export function PosterCard({ poster, modalDisabled = false, size=null }: PosterCardProps) {
    // Do not render if there are no images
    if (!poster.images || poster.images.length === 0) {
        return null;
    }

    return (
        <div
            className={`relative md:w-[400px] md:h-[566px] bg-gray-200 rounded-lg overflow-hidden shadow-lg select-none drop-shadow-xl drop-shadow-gray-800`}
            style={{ width: size ?? 277, height: size?size*392/277:392 }}
            >
            {modalDisabled ? (
                <PosterImage poster={poster} size={size}/>
            ) : (
                <Modal button={<PosterImage poster={poster} size={size}/>} title={poster.title}
                    ModalClass="fixed inset-0 z-[1000] top-12 left-1/2 translate-x-[-45vw] w-[90vw] md:w-[60vw] md:translate-x-[-30vw] max-h-[80vh]"
                >
                    <div className="relative w-full aspect-[277/392] mb-4">
                        <Image
                            src={poster.images[0]}
                            alt={poster.title}
                            fill={true}
                            className="object-contain"
                        />
                    </div>
                    <p className="whitespace-pre-wrap">{poster.desc}</p>
                    {poster.images.length > 0 && (
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
