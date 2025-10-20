'use client';

import {animate, motion, MotionValue, useMotionValue, useTransform} from "motion/react";
import {useEffect, useRef} from "react";
import {PosterCard} from "./PosterCard";

// The data structure received from the parent, matching PosterCard
type PosterData = {
    id: number;
    title: string;
    desc: string;
    images: string[];
};

interface PosterCarouselProps {
    posters: PosterData[];
    onSelectedIndexChange?: (index: number) => void;
}

const POSTER_HEIGHT = 566; // Adjusted to match PosterCard's large height
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
    }: {
        poster: PosterData;
        radius: number;
        offset: number;
        angle: number;
        yRotation: MotionValue<number>;
    }) {
    const currentAngle = useTransform(yRotation, (y) => y + angle);

    const z = useTransform(currentAngle, (a) => Math.cos(a * (Math.PI / 180)));
    const scale = useTransform(z, [-1, 1], [0.75, 1]);
    const opacity = useTransform(z, [-1, 0, 0.85, 1], [0.5, 0.7, 0.8, 1]);
    const zIndex = useTransform(z, [-1, 1], [-100, 100]);
    // 視界の外にあるポスターの描画を抑制
    const visibility = useTransform(z, (val) => (val < 0.3 ? 'hidden' : 'visible'));

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
            className="absolute"
            style={{
                transformOrigin: "bottom",
                transform,
                opacity,
                zIndex,
                // ブラウザに最適化を促し、描画を抑制
                visibility: visibility,
                willChange: 'transform, opacity, z-index, visibility',
            }}
        >
            {/* Disable modal on PC layout */}
            <PosterCard poster={poster} modalDisabled={true}/>
        </motion.div>
    );
}

export function PosterCarousel({posters, onSelectedIndexChange}: PosterCarouselProps) {
    const yRotation = useMotionValue(0);

    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const snapToClosest = () => {
            const numPosters = posters.length;
            if (numPosters === 0) return;
            const anglePerPoster = 360 / numPosters;
            const closestPosterIndex = Math.round(-yRotation.get() / anglePerPoster);
            const snapRotation = closestPosterIndex * -anglePerPoster;
            const finalIndex = (closestPosterIndex % numPosters + numPosters) % numPosters;
            onSelectedIndexChange?.(finalIndex);
            animate(yRotation, snapRotation, {
                type: "spring",
                stiffness: 300,
                damping: 30,
            });
        };

        const onWheelScroll = (event: WheelEvent) => {
            event.preventDefault();

            yRotation.stop();
            animate(yRotation, yRotation.get() - event.deltaY * 0.1, {
                type: "spring",
                stiffness: 300,
                damping: 30,
                onComplete: () => {
                    snapToClosest();
                }
            });
        };

        const carouselElement = carouselRef.current;
        // This component is only for PC, so we always attach the wheel event.
        if (carouselElement) {
            carouselElement.addEventListener("wheel", onWheelScroll, {passive: false});
        }

        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener("wheel", onWheelScroll);
            }
        };
    }, [yRotation, posters, onSelectedIndexChange]);
    
    const onPan = undefined;
    const onPanEnd = undefined;

    const radius = POSTER_HEIGHT * 8.5; // Increased multiplier to spread out posters
    const offset = -radius;

    return (
        <motion.div
            ref={carouselRef}
            onPan={onPan}
            onPanEnd={onPanEnd}
            className="w-full h-dvh flex items-center justify-center cursor-grab active:cursor-grabbing pt-0 touch-none overflow-hidden z-100 overscroll-none"
            style={{perspective: `${2000}px`}} // Increased perspective for larger items
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
                        yRotation={yRotation}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}
