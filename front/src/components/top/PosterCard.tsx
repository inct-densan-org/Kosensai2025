'use client';

import Image from "next/image";
import { Modal } from "@/components/Modal";
import { useRouter } from "next/navigation";
import { DialogClose } from "../ui/dialog";

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
    size?: number | null
    index?: number | null
}

// Define PosterImage outside of PosterCard to prevent it from being re-created on every render.
// This is crucial for performance and preventing re-mounts.
const PosterImage = ({ poster, size = null }: { poster: Poster, size?: number | null }) => (
    <Image
        src={poster.images[0]} // Use the first image as the trigger
        alt={poster.title}
        fill={true}
        sizes={`(max-width: 768px) ${size ? `${size}, ${size * 400 / 277}` : "277px, 400px"}`}
        className="!absolute !object-contain !w-full !h-full !inset-0"
        draggable={false}
    />
);

export function PosterCard({ poster, modalDisabled = false, size = null, index = null }: PosterCardProps) {
    // Do not render if there are no images
    if (!poster.images || poster.images.length === 0) {
        return null;
    }
    const router = useRouter()

    return (
        <div
            className={`relative md:w-[400px] md:h-[566px] bg-gray-200 rounded-lg overflow-hidden shadow-lg select-none drop-shadow-xl drop-shadow-gray-800`}
            style={{ width: size ?? 277, height: size ? size * 392 / 277 : 392 }}
        >
            {modalDisabled ? (
                <PosterImage poster={poster} size={size} />
            ) : (
                <Modal
                    button={<PosterImage poster={poster} size={size} />} title={poster.title}
                    ModalClass="fixed inset-0 z-[1000] top-24 left-1/2 translate-x-[-45vw] translate-y-0! w-[90vw] md:w-[60vw] md:translate-x-[-30vw] h-[400px]!  "
                    className="object-contain"
                >
                    <div className="h-[70dvh] flex flex-col">
                        <p className="whitespace-pre-wrap grow-0">
                            {poster.desc}
                        </p>

                        {poster.images.length === 1 ? (
                            <div className="relative mb-4 h-auto w-auto aspect-[277/392] mx-auto grow max-w-full flex-shrink-0">
                                <Image
                                    src={poster.images[0]}
                                    alt={poster.title}
                                    fill={true}
                                    className="object-contain"
                                />
                            </div>
                        ) : (
                            <div className="flex mt-4 space-x-2 items-center w-full h-full">
                                {poster.images.slice(0, 2).map((img, index) => (
                                    <div key={index} className="relative w-1/2 aspect-[277/392]">
                                        <Image
                                            src={img}
                                            alt={`${poster.title} - image ${index + 1}`}
                                            fill
                                            className="object-contain rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        <DialogClose asChild>
                            <button className={" block ml-auto mt-auto mb-4 text-right text-[2vh] hover:cursor-pointer"}
                                onClick={() => {
                                    setTimeout(()=>
                                        router.push(`/map${index != null ? `?index=${index}` : ""}`)
                                    ,50)
                                }}
                            >マップで見る &gt; </button>
                        </DialogClose>
                    </div>
                </Modal>
            )}
        </div>
    );
}
