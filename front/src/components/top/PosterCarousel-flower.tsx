"use client";

import {animate, motion, MotionValue, PanInfo, useMotionValue, useTransform} from "motion/react";
import {PosterCard} from "./PosterCard";
import {useCallback, useEffect, useRef, useState} from "react";
import {clamp} from "motion";

type Poster = {
    id: number;
    title: string;
    image: string; // path to image
};

interface PosterCarouselProps {
    posters: Poster[];
    onDraggingChange?: (isDragging: boolean) => void;
    isModalOpen: boolean;
}


// SP
const POSTER_WIDTH = 210;
const POSTER_HEIGHT = 297;

// const TILT_ANGLE = -8;
const TILT_ANGLE = 0;
const MAX_ROTATION_SPEED = 3000;
const AUTOROTATE_DURATION = 150;

// PC
// const POSTER_WIDTH = 210;
// const POSTER_HEIGHT = 297;
// const DISTANCE = 200;
// const RADIUS = 900;
// const TILT_ANGLE = 90;
// const MAX_ROTATION_SPEED = 3000;


const DRAG_FACTOR = -1300; // 小さいほどよく回る

/**
 * A component that renders a single poster with billboarding and perspective scaling.
 */
function BillboardPoster({
                             poster,
    radius, offset,
                             angle,
                             yRotation,
                             onPosterClick,
                         }: {
    poster: Poster;
    radius: number;
    offset: number
    angle: number;
    yRotation: MotionValue<number>;
    onPosterClick: (event: MouseEvent | TouchEvent | PointerEvent) => boolean | undefined;
}) {
    const currentAngle = useTransform(yRotation, (y) => y + angle);

    // --- Final, Declarative Implementation ---

    const z = useTransform(currentAngle, (a) => Math.cos(a * (Math.PI / 180)));

    // Use a declarative mapping to handle the final "pop" of the focused poster.
    // This avoids the pitfalls of imperative if/else logic with spring animations.
    const scale = useTransform(
        z, // Input: z-depth from -1 (back) to 1 (front)
        // [-1, 0.5, 0.99, 1], // Input range
        // [0.6, 0.7, 0.8, 1.1]  // Output range: The scale jumps from 1.5x to 2.0x in the last 1% of movement.
        // [0.3, 0.4, 0.5, 1.5]  // Output range: The scale jumps from 1.5x to 2.0x in the last 1% of movement.
        [1, 1],
        [1, 1]
    );

    const opacity = useTransform(z, [-1, 0, 0.85, 1], [0.5, 0.7, 0.8, 1]);
    const zIndex = useTransform(z, [-1, 1], [-100, 100])

    const transform = useTransform(
        [currentAngle, scale],
        ([a, s]) => `
      translateX(-50%)
      translateY(-50%)
      rotateX(${a}deg)
      translateZ(${radius}px)
      rotateX(${-(a as number)}deg)
      translateZ(${-offset}px)
      scale(${s})
    `
    );

    return (
        <motion.div
            onTap={onPosterClick}
            className="absolute "
            style={{
                transformOrigin: "bottom",
                transform: transform,
                opacity: opacity,
                
                zIndex: zIndex,
            }}
        >
            <PosterCard poster={poster}/>
        </motion.div>
    );
}

export function PosterCarousel({posters, onDraggingChange, isModalOpen}: PosterCarouselProps) {
    const yRotation = useMotionValue(0);
    const [screenSize, setScreenSize] = useState({width: 0, height: 0});
    const scrollTimeoutRef = useRef<number | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const autoRotateTimeoutRef = useRef<number | null>(null);
    const isAutoRotating = useRef(false);

    const resetAutoRotationTimer = useCallback(() => {
        if (isAutoRotating.current) {
            yRotation.stop();
            isAutoRotating.current = false;
        }
        if (autoRotateTimeoutRef.current) {
            window.clearTimeout(autoRotateTimeoutRef.current);
        }
        autoRotateTimeoutRef.current = window.setTimeout(() => {
            if (screenSize.width <= screenSize.height && !isModalOpen) {
                isAutoRotating.current = true;
                animate(yRotation, yRotation.get() - 360, {
                    duration: AUTOROTATE_DURATION,
                    repeat: Infinity,
                    ease: "linear",
                });
            }
        }, 3000);
    }, [isModalOpen, screenSize.height, screenSize.width, yRotation]);

    useEffect(() => {
        resetAutoRotationTimer();
        return () => {
            if (autoRotateTimeoutRef.current) {
                window.clearTimeout(autoRotateTimeoutRef.current);
            }
            yRotation.stop();
        };
    }, [resetAutoRotationTimer]);
    
    useEffect(() => {
        const handleResize = () => {
            setScreenSize({width: window.innerWidth, height: window.innerHeight});
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const onWheelScroll = (event: WheelEvent) => {
            resetAutoRotationTimer();
            event.preventDefault();
            event.stopPropagation();
            if (scrollTimeoutRef.current) {
                window.clearTimeout(scrollTimeoutRef.current);
            }

            yRotation.stop();
            const scrollFactor = 0.2; // Adjust this value for sensitivity
            yRotation.set(yRotation.get() - event.deltaY * scrollFactor);

            scrollTimeoutRef.current = window.setTimeout(() => {
                const numPosters = posters.length;
                if (numPosters === 0) return;
                const anglePerPoster = 360 / numPosters;
                const currentRotation = yRotation.get();

                const closestPosterIndex = Math.round(-currentRotation / anglePerPoster);
                const snapRotation = closestPosterIndex * -anglePerPoster;

                animate(yRotation, snapRotation, {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                });
            }, 150);
        };

        const carouselElement = carouselRef.current;
        if (carouselElement) {
            carouselElement.addEventListener("wheel", onWheelScroll as any, { passive: false });
        }

        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener("wheel", onWheelScroll as any);
            }
        };
    }, [yRotation, posters, resetAutoRotationTimer]);
    
    const onPanStart = () => {
        resetAutoRotationTimer();
        onDraggingChange?.(true);
    };
    
    const onPan = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.velocity.x + info.velocity.y == 0) return
        yRotation.set(yRotation.get() - clamp(-MAX_ROTATION_SPEED, MAX_ROTATION_SPEED, info.velocity.y * Math.abs(info.delta.y)) / DRAG_FACTOR);
    };

    const onPanEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        onDraggingChange?.(false);
        const numPosters = posters.length;
        const anglePerPoster = 360 / numPosters;

        // Convert pixel velocity to degrees/sec
        const velocityInDegrees = -info.velocity.y / DRAG_FACTOR;

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

    const isPosterInFront = (posterIndex: number) => {
        const numPosters = posters.length;
        if (numPosters === 0) return false;

        const anglePerPoster = 360 / numPosters;
        const posterAngle = (yRotation.get() + posterIndex * anglePerPoster) % 360;

        // 角度が0度に近いか（許容誤差を設ける）
        const tolerance = 5; // 5度以内を正面とみなす
        console.log(posterAngle)
        return Math.abs(posterAngle) < tolerance || Math.abs(posterAngle - 360) < tolerance || Math.abs(posterAngle + 360) < tolerance;
    };
    
    const handlePosterClick = (event: MouseEvent | TouchEvent | PointerEvent, posterIndex: number) => {
        resetAutoRotationTimer();
        if (isPosterInFront(posterIndex)) {
            // 既に正面にある場合は何もしない（クリックイベントを透過させ、ダイアログを開かせる）
            return true;
        }
        // 正面にない場合は、デフォルトのクリックイベント（ダイアログ表示）をキャンセル
        event.preventDefault();
        event.stopPropagation();
        
        // クリックされたポスターが正面に来るようにアニメーション
        const anglePerPoster = 360 / posters.length;
        const snapRotation = posterIndex * -anglePerPoster;
        
        // yRotationの値を直接変更するのではなく、アニメーションさせる
        animate(yRotation, snapRotation, {
            type: "spring",
            stiffness: 300,
            damping: 40, // 少し弾みを抑える
        });
        return false;
    };
    
    const radius =  POSTER_HEIGHT * 16
    const offset = -radius/2;

    return (
        <motion.div
            ref={carouselRef}
            onPanStart={onPanStart}
            onPan={onPan}
            onPanEnd={onPanEnd}
            className="w-full h-dvh flex items-center  justify-center  cursor-grab active:cursor-grabbing pt-0 touch-none overflow-hidden z-100 overscroll-none"
            style={{
                perspective: `${1000}px`,
                
            }}
        >
            <motion.div
                className="relative"
                style={{
                    width: "1px",
                    height: "1px",
                    transformStyle: "preserve-3d",
                    transform: `translateX(${offset}px)  rotateX(${TILT_ANGLE}deg) `,
                }}
            >
                <div className={"absolute top-1/2 left-0 z-[200] animate-scroll-down animate-infinite animate-duration-1000 bg-red-400 w-32 h-32"}>
                    ↓
                </div>

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
    );
}
