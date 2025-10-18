'use client';

import {animate, motion, MotionValue, PanInfo, useMotionValue, useTransform} from "motion/react";
import {useEffect, useRef, useState} from "react";
import {clamp} from "motion";
import Image from "next/image";
import {ControllableModal} from "@/components/ControllableModal";

// The data structure received from the parent
type PosterData = {
    id: number;
    title: string;
    desc: string;
    imagePath: string;
};

// The content for the modal
type ModalContent = {
    title: string;
    desc: string;
} | null;

interface PosterCarouselProps {
    posters: PosterData[];
    onSelectedIndexChange?: (index: number) => void;
}

const POSTER_HEIGHT = 297;
const TILT_ANGLE = 0;
const MAX_ROTATION_SPEED = 3000;
const DRAG_FACTOR = -1300;

function BillboardPoster(
    {
        poster,
        radius,
        offset,
        angle,
        yRotation,
        onPosterClick,
    }: {
        poster: PosterData;
        radius: number;
        offset: number;
        angle: number;
        yRotation: MotionValue<number>;
        onPosterClick: (event: MouseEvent | TouchEvent | PointerEvent) => void;
    }) {
    const currentAngle = useTransform(yRotation, (y) => y + angle);

    const z = useTransform(currentAngle, (a) => Math.cos(a * (Math.PI / 180)));
    const scale = useTransform(z, [-1, 1], [0.75, 1]);
    const opacity = useTransform(z, [-1, 0, 0.85, 1], [0.5, 0.7, 0.8, 1]);
    const zIndex = useTransform(z, [-1, 1], [-100, 100]);

    const transform = useTransform(
        [currentAngle, scale],
        ([a, s]) => `
      translateX(-50%)
      translateY(-50%)
      rotateX(${-(a as number)}deg)
      translateZ(${radius}px)
      rotateX(${(a as number)}deg)
      translateZ(${offset}px)
      scale(${s})
    `
    );

    return (
        <motion.div
            onTap={onPosterClick} // Use onTap to distinguish from pan gestures
            className="absolute"
            style={{transformOrigin: "bottom", transform, opacity, zIndex}}
        >
            <div
                className="relative w-[277px] h-[392px] md:w-[400px] md:h-[566px] bg-gray-200 rounded-lg overflow-hidden shadow-lg select-none drop-shadow-xl drop-shadow-gray-800">
                {poster.imagePath && (
                    <Image
                        src={poster.imagePath}
                        alt={poster.title}
                        fill={true}
                        sizes="400px"
                        className="absolute! object-fill! w-full! h-full!"
                        draggable={false}
                    />
                )}
            </div>
        </motion.div>
    );
}

export function PosterCarousel({posters, onSelectedIndexChange}: PosterCarouselProps) {
    const yRotation = useMotionValue(0);
    const [isPc, setIsPc] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContent>(null);

    const carouselRef = useRef<HTMLDivElement>(null);
    const wheelSnapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsPc(window.innerWidth >= 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const snapToClosest = () => {
            const numPosters = posters.length;
            if (numPosters === 0) return;
            const anglePerPoster = 360 / numPosters;
            const closestPosterIndex = Math.round(-yRotation.get() / anglePerPoster);
            const snapRotation = closestPosterIndex * -anglePerPoster;

            animate(yRotation, snapRotation, {
                type: "spring",
                stiffness: 300,
                damping: 30,
                onComplete: () => {
                    const finalIndex = (closestPosterIndex % numPosters + numPosters) % numPosters;
                    onSelectedIndexChange?.(finalIndex);
                }
            });
        };

        const onWheelScroll = (event: WheelEvent) => {
            event.preventDefault();

            if (wheelSnapTimeoutRef.current) {
                clearTimeout(wheelSnapTimeoutRef.current);
            }

            yRotation.stop();
            yRotation.set(yRotation.get() - event.deltaY * 0.05); // Adjusted sensitivity

            wheelSnapTimeoutRef.current = setTimeout(() => {
                snapToClosest();
            }, 150);
        };

        const carouselElement = carouselRef.current;
        if (carouselElement && isPc) {
            carouselElement.addEventListener("wheel", onWheelScroll, {passive: false});
        }

        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener("wheel", onWheelScroll);
            }
            if (wheelSnapTimeoutRef.current) {
                clearTimeout(wheelSnapTimeoutRef.current);
            }
        };
    }, [yRotation, posters, onSelectedIndexChange, isPc]);

    const onPan = (_: any, info: PanInfo) => {
        yRotation.set(yRotation.get() - clamp(-MAX_ROTATION_SPEED, MAX_ROTATION_SPEED, info.velocity.y * Math.abs(info.delta.y)) / DRAG_FACTOR);
    };

    const onPanEnd = (_: any, info: PanInfo) => {
        const numPosters = posters.length;
        if (numPosters === 0) return;
        const anglePerPoster = 360 / numPosters;

        const velocityInDegrees = -info.velocity.y / DRAG_FACTOR;
        const projectionTime = 0.1;
        const projectedRotation = yRotation.get() + velocityInDegrees * projectionTime;

        const closestPosterIndex = Math.round(-projectedRotation / anglePerPoster);
        const snapRotation = closestPosterIndex * -anglePerPoster;

        animate(yRotation, snapRotation, {
            type: "spring",
            stiffness: 300,
            damping: 30,
            velocity: velocityInDegrees,
            onComplete: () => {
                const finalIndex = (closestPosterIndex % numPosters + numPosters) % numPosters;
                onSelectedIndexChange?.(finalIndex);
            }
        });
    };

    // A robust, tolerance-based check for the front poster.
    const isPosterInFront = (posterIndex: number) => {
        const numPosters = posters.length;
        if (numPosters === 0) return false;
        const anglePerPoster = 360 / numPosters;
        const posterAngle = yRotation.get() + posterIndex * anglePerPoster;
        const normalizedAngle = (posterAngle % 360 + 540) % 360 - 180;
        const tolerance = anglePerPoster / 2.1; // A generous tolerance
        return Math.abs(normalizedAngle) < tolerance;
    };

    const handlePosterClick = (event: MouseEvent | TouchEvent | PointerEvent, posterIndex: number) => {
        // The sole responsibility of a tap is to open the modal if the poster is in front.
        if (isPosterInFront(posterIndex)) {
            if (!isPc) {
                const poster = posters[posterIndex];
                setModalContent({title: poster.title, desc: poster.desc});
            }
        }
        // If the poster is not in front, do nothing on tap. The user can pan/swipe to rotate.
        // This separation of concerns prevents event conflicts and ensures stability.
    };

    const radius = POSTER_HEIGHT * 16;
    const offset = -radius;

    return (
        <>
            {modalContent && (
                <ControllableModal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
                    <h2 className="text-2xl font-bold">{modalContent.title}</h2>
                    <p className="whitespace-pre-wrap">{modalContent.desc}</p>
                </ControllableModal>
            )}

            <motion.div
                ref={carouselRef}
                onPan={isPc ? undefined : onPan}
                onPanEnd={isPc ? undefined : onPanEnd}
                className="w-full h-dvh flex items-center justify-center cursor-grab active:cursor-grabbing pt-0 touch-none overflow-hidden z-100 overscroll-none"
                style={{perspective: `${1000}px`}}
            >
                <motion.div
                    className="relative"
                    style={{
                        width: "1px",
                        height: "1px",
                        transformStyle: "preserve-3d",
                        transform: `rotateX(${TILT_ANGLE}deg)`,
                    }}
                >
                    {posters.map((poster, index) => (
                        <BillboardPoster
                            key={poster.id}
                            poster={poster}
                            offset={offset}
                            radius={radius}
                            angle={(360 / posters.length) * index}
                            onPosterClick={(event) => handlePosterClick(event, index)}
                            yRotation={yRotation}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </>
    );
}
