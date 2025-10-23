'use client';

import {animate, motion, MotionValue, PanInfo, useMotionValue, useTransform} from "motion/react";
import {PosterCard} from "./PosterCard";
import {memo, useCallback, useEffect, useState} from "react";
import {clamp} from "motion";

// Updated Poster type to match PosterCard
type Poster = {
    id: number;
    title: string;
    desc: string;
    images: string[]; // path to image
};

interface PosterCarouselProps {
    posters: Poster[];
    onDraggingChange?: (isDragging: boolean) => void;
    onChangeIndex?:(value:number)=>void
    initialIndex?:number
    disable?:boolean
}


// SP Constants
const POSTER_WIDTH = 210;
const POSTER_HEIGHT = 297;
const CONTAINER_HEIGHT = 450;
const DISTANCE = 600;
const RADIUS = 1200;
const TILT_ANGLE = -8;
const MAX_ROTATION_SPEED = 3000;
const DRAG_FACTOR = -1300; // Controls drag sensitivity

// --- Child Component ---
// BillboardPoster is defined at the top level of the module to prevent it from being
// recreated on every render of the parent component.
const BillboardPoster = memo(function BillboardPoster({
    poster,
    angle,
    yRotation,
    onPosterClick,
    index,
    disable = false
}: {
    poster: Poster;
    angle: number;
    yRotation: MotionValue<number>;
    onPosterClick: (event: MouseEvent | TouchEvent | PointerEvent, index: number) => boolean | void;
    index: number;
    disable?:boolean
}) {
    const currentAngle = useTransform(yRotation, (y) => y + angle);
    const z = useTransform(currentAngle, (a) => Math.cos(a * (Math.PI / 180)));
    const scale = useTransform(z, [-1, 0.5, 0.99, 1], [0.6, 0.7, 0.8, 1.2]);
    const opacity = useTransform(z, [-1, 0, 0.85, 1], [0.5, 0.7, 0.8, 1]);
    const zIndex = useTransform(z, [-1, 1], [-100, 100]);
    // 視界の外にあるポスターの描画を抑制
    const visibility = useTransform(z, (val) => (val < 0.1 ? 'hidden' : 'visible'));

    const transform = useTransform(
        [currentAngle, scale],
        ([a, s]) => `
      rotateY(${a}deg)
      translateZ(${RADIUS}px)
      rotateY(${-(a as number)}deg)
      rotateX(${-TILT_ANGLE}deg)
      scale(${s})
    `
    );

    const handleClick = (event: MouseEvent | TouchEvent | PointerEvent) => {
        onPosterClick(event, index);
    };

    return (
        <motion.div
            onTap={handleClick}
            className="absolute "
            style={{
                transformOrigin: "bottom",
                transform: transform,
                opacity: opacity,
                zIndex: zIndex,
                left: `calc(0px - ${POSTER_WIDTH / 2}px)`,
                top: `calc(0px - ${POSTER_HEIGHT / 2}px)`,
                // ブラウザに最適化を促し、描画を抑制
                visibility: visibility,
                willChange: 'transform, opacity, z-index, visibility',
            }}
        >
            <PosterCard poster={poster} modalDisabled={disable}/>
        </motion.div>
    );
});
// Assigning a display name is good practice for debugging memoized components.
BillboardPoster.displayName = 'BillboardPoster';


// --- Main Carousel Component ---
export function PosterCarouselSP({posters, onDraggingChange, onChangeIndex,initialIndex=0,disable = false}: PosterCarouselProps) {
    const yRotation = useMotionValue(0);
    const [screenSize, setScreenSize] = useState({width: 0, height: 0});

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({width: window.innerWidth, height: window.innerHeight});
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        if (posters.length > 0) {
            const anglePerPoster = 360 / posters.length;
            const targetRotation = -initialIndex * anglePerPoster;
            animate(yRotation, targetRotation, {
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 2.5, // 軽い遅延で自然に
            });
        }
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const onPanStart = () => {
        yRotation.stop();
        onDraggingChange?.(true);
    };

    const onPan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        yRotation.set(yRotation.get() - clamp(-MAX_ROTATION_SPEED, MAX_ROTATION_SPEED, info.velocity.x * Math.abs(info.delta.x)) / DRAG_FACTOR);
    };

    const onPanEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        onDraggingChange?.(false);
        const numPosters = posters.length;
        const anglePerPoster = 360 / numPosters;
        const velocityInDegrees = -info.velocity.x / DRAG_FACTOR;
        const projectionTime = 0.1;
        const projectedRotation = yRotation.get() + velocityInDegrees * projectionTime;
        const closestPosterIndex = Math.round(-projectedRotation / anglePerPoster);
        onChangeIndex?.(closestPosterIndex)
        const snapRotation = closestPosterIndex * -anglePerPoster;

        animate(yRotation, snapRotation, {
            type: "spring",
            stiffness: 300,
            damping: 30,
            velocity: velocityInDegrees,
        });
    };

    const handlePosterClick = useCallback((event: MouseEvent | TouchEvent | PointerEvent, posterIndex: number) => {
        const numPosters = posters.length;
        if (numPosters === 0) return false;

        const anglePerPoster = 360 / numPosters;
        const posterAngle = yRotation.get() + posterIndex * anglePerPoster;
        const normalizedAngle = (posterAngle % 360 + 540) % 360 - 180;
        const tolerance = anglePerPoster / 2.1;
        const isInFront = Math.abs(normalizedAngle) < tolerance;

        if (isInFront) {
            return true;
        }

        event.preventDefault();
        event.stopPropagation();

        const snapRotation = posterIndex * -anglePerPoster;
        animate(yRotation, snapRotation, {
            type: "spring",
            stiffness: 300,
            damping: 40,
        });
        return false;
    }, [posters.length, yRotation]);

    const largestPosterScale = 1.0;
    let carouselScale;

    if (screenSize.width === 0) {
        carouselScale = 0.51; // Default scale
    } else if (screenSize.height > screenSize.width) {
        const targetHeight = (1 / 6) * CONTAINER_HEIGHT;
        carouselScale = targetHeight / (POSTER_HEIGHT * largestPosterScale);
    } else {
        const targetHeight = (1 / 6) * CONTAINER_HEIGHT;
        carouselScale = targetHeight / (POSTER_HEIGHT * largestPosterScale);
    }

    return (
        <motion.div
            onPanStart={onPanStart}
            onPan={onPan}
            onPanEnd={onPanEnd}
            className="w-full flex items-center  justify-center  cursor-grab active:cursor-grabbing pt-0 touch-pan-y"
            style={{
                perspective: `${1000}px`,
                height: `${CONTAINER_HEIGHT}px`,
            }}
        >
            <motion.div
                className="relative"
                style={{
                    width: "1px",
                    height: "1px",
                    transformStyle: "preserve-3d",
                    transform: `translateZ(-${DISTANCE}px) scale(${carouselScale}) rotateX(${TILT_ANGLE}deg) `,
                }}
            >
                {posters.map((poster, index) => (
                    <BillboardPoster
                        key={poster.id}
                        poster={poster}
                        angle={(360 / posters.length) * index}
                        onPosterClick={handlePosterClick}
                        index={index}
                        yRotation={yRotation}
                        disable={disable}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}
