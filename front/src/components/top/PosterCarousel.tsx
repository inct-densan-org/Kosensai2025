"use client";

import {animate, motion, MotionValue, PanInfo, useMotionValue, useTransform} from "motion/react";
import {PosterCard} from "./PosterCard";
import {useEffect, useState} from "react";

type Poster = {
    id: number;
    title: string;
    image: string; // path to image
};

interface PosterCarouselProps {
    posters: Poster[];
    onDraggingChange?: (isDragging: boolean) => void;
}


// SP
// const POSTER_WIDTH = 210;
// const POSTER_HEIGHT = 297;
// const CONTAINER_HEIGHT = 450;
// const DISTANCE = 200;
// const RADIUS = 900;
// const TILT_ANGLE = -8;

// PC
const POSTER_WIDTH = 210;
const POSTER_HEIGHT = 297;
const CONTAINER_HEIGHT = 450;
const DISTANCE = 300;
const RADIUS = 1000;
const TILT_ANGLE = -8;
// RADIUSを横幅pxと同じくらいにすると第四象限だけ見える?
// const TILT_ANGLE = -90;

const DRAG_FACTOR = -13000; // Controls drag sensitivity. 1.0 creates a 1:1 mapping.

/**
 * A component that renders a single poster with billboarding and perspective scaling.
 */
function BillboardPoster({
                             poster,
                             angle,
                             tiltAngle,
                             radius,
                             yRotation,
                         }: {
    poster: Poster;
    angle: number;
    tiltAngle: number;
    radius: number,
    yRotation: MotionValue<number>;
}) {
    const currentAngle = useTransform(yRotation, (y) => y + angle);

    // --- Final, Declarative Implementation ---

    const z = useTransform(currentAngle, (a) => Math.cos(a * (Math.PI / 180)));

    // Use a declarative mapping to handle the final "pop" of the focused poster.
    // This avoids the pitfalls of imperative if/else logic with spring animations.
    const scale = useTransform(
        z, // Input: z-depth from -1 (back) to 1 (front)
        [-1, 0.5, 0.99, 1], // Input range
        [0.6, 0.7, 0.8, 1.1]  // Output range: The scale jumps from 1.5x to 2.0x in the last 1% of movement.
        // [0.3, 0.4, 0.5, 1.5]  // Output range: The scale jumps from 1.5x to 2.0x in the last 1% of movement.
    );

    const opacity = useTransform(z, [-1, 0, 0.85, 1], [0.5, 0.7, 0.8, 1]);

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

    return (
        <motion.div
            className="absolute "
            style={{
                transformOrigin: "bottom",
                transform: transform,
                opacity: opacity,
                left: `calc(0px - ${POSTER_WIDTH / 2}px)`,
                top: `calc(0px - ${POSTER_HEIGHT / 2}px)`,
            }}
        >
            <PosterCard poster={poster}/>
        </motion.div>
    );
}

export function PosterCarousel({posters, onDraggingChange}: PosterCarouselProps) {
    const yRotation = useMotionValue(0);
    const [screenSize, setScreenSize] = useState({width: 0, height: 0});

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({width: window.innerWidth, height: window.innerHeight});
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const onPanStart = () => {
        yRotation.stop();
        onDraggingChange?.(true);
    };

    const onPan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.velocity.x + info.velocity.y == 0) return
        // yRotation.set(yRotation.get() - info.offset.x * Math.abs(info.velocity.x) / DRAG_FACTOR);
        yRotation.set(yRotation.get() - info.offset.x * Math.abs(info.velocity.x) / DRAG_FACTOR);
        console.log(info.velocity)
    };

    const onPanEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        onDraggingChange?.(false);
        const numPosters = posters.length;
        const anglePerPoster = 360 / numPosters;

        // Convert pixel velocity to degrees/sec
        const velocityInDegrees = -info.velocity.x / DRAG_FACTOR;

        // Project the rotation forward based on velocity to determine the target poster
        const projectionTime = 0.1; // Project 100ms into the future
        const projectedRotation = yRotation.get() + velocityInDegrees * projectionTime;

        const closestPosterIndex = Math.round(-projectedRotation / anglePerPoster);
        const snapRotation = closestPosterIndex * -anglePerPoster;

        animate(yRotation, snapRotation, {
            type: "spring",
            stiffness: 300,
            damping: 30,
            velocity: velocityInDegrees,
        });
    };

    const largestPosterScale = 1.0;
    let carouselScale;

    if (screenSize.width === 0) {
        carouselScale = 0.51; // Default scale
    } else if (screenSize.height > screenSize.width) {
        // // Portrait
        // const targetWidth = (1 / 3) * screenSize.width;
        // carouselScale = targetWidth / (POSTER_WIDTH * largestPosterScale);
        // Landscape
        const targetHeight = (1 / 6) * CONTAINER_HEIGHT;
        carouselScale = targetHeight / (POSTER_HEIGHT * largestPosterScale);
    } else {
        // Portrait
        // const targetWidth = (1 / 3) * screenSize.width;
        // carouselScale = targetWidth / (POSTER_WIDTH * largestPosterScale);
        // // Landscape
        const targetHeight = (1 / 6) * CONTAINER_HEIGHT;
        carouselScale = targetHeight / (POSTER_HEIGHT * largestPosterScale);
    }

    return (
        <motion.div
            onPanStart={onPanStart}
            onPan={onPan}
            onPanEnd={onPanEnd}
            className="w-full  flex items-center  justify-center  cursor-grab active:cursor-grabbing pt-0 touch-pan-y"
            style={{
                // perspective: `${DISTANCE}px`,
                // perspective: `${POSTER_WIDTH*5}px`,
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
                        tiltAngle={TILT_ANGLE}
                        radius={RADIUS}
                        yRotation={yRotation}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}
