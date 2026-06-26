'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {TransformComponent, TransformWrapper} from 'react-zoom-pan-pinch';

export type MapPin = {
    id: number;
    label: string;
    name: string;
    xRatio: number; // 0-100
    yRatio: number; // 0-100
    isHavePhoto?: boolean;
    locationIds?: number[];
    type: "photo" | "venue" | "place" | "WC" | "door";
    desc?: string;
    labelPlace: "left" | "right"
    rotation?: number;
    owner?: string;
};

type MapViewerProps = {
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
    pins?: MapPin[];
    currentPos?: { xRatio: number; yRatio: number } | null;
    onPinClick?: (pin: MapPin) => void;
};

export const MapViewer = ({
                              imageUrl,
                              imageWidth,
                              imageHeight,
                              pins = [],
                              currentPos,
                              onPinClick,
                          }: MapViewerProps) => {
    const [minScale, setMinScale] = useState<number | null>(1);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    const calcMinScale = (containerRect: DOMRect) => {
        // コンテナに画像が収まる最小のスケールを計算
        const scaleX = containerRect.width / imageWidth;
        const scaleY = containerRect.height / imageHeight;
        setMinScale(Math.min(scaleX, scaleY));
    };

    useEffect(() => {
        if (!mapContainerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            calcMinScale(entries[0].contentRect);
        });
        observer.observe(mapContainerRef.current);
        return () => observer.disconnect();
    }, [imageWidth, imageHeight]);

    const normalizedImageUrl = (() => {
        const trimmed = imageUrl.trim();
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;

        const withoutPublicPrefix = trimmed.replace(/^\/?public\//, '/');
        if (withoutPublicPrefix.startsWith('/')) return withoutPublicPrefix;
        return `/${withoutPublicPrefix}`;
    })();

    return (
        <div ref={mapContainerRef} className="relative h-full w-full max-h-[70dvh] bg-gray-200 overflow-hidden">
            {minScale !== null && (
                <TransformWrapper
                    initialScale={minScale}
                    minScale={minScale}
                    maxScale={4}
                    centerOnInit={true}
                    limitToBounds={true}
                    wheel={{step: 0.1}}
                >
                    <TransformComponent wrapperStyle={{width: '100%', height: '100%'}}>
                        <div
                            style={{
                                position: 'relative',
                                width: `${imageWidth}px`,
                                height: `${imageHeight}px`,
                            }}
                        >
                            {/* 地図画像 */}
                            <Image
                                src={normalizedImageUrl}
                                alt="Map"
                                width={imageWidth}
                                height={imageHeight}
                                unoptimized
                                priority
                                style={{width: '100%', height: '100%', display: 'block'}}
                            />

                            {/* 会場ピンの描画 */}
                            {pins.map((pin) => (
                                <button
                                    key={pin.id}
                                    onClick={() => onPinClick?.(pin)}
                                    className={`absolute flex flex-col  items-center justify-center -translate-x-1/2 -translate-y-full scale-50 transition-transform  ${pin.isHavePhoto ? "hover:scale-60 active:scale-45" : ""}`}
                                    style={{left: `${pin.xRatio}%`, top: `${pin.yRatio}%`}}
                                >
                                    {pin.type === 'venue' || pin.type === 'place' ? (
                                            <>
                                                {/*<span className={`absolute rounded border-[1px] ${pin.type === "venue" ? 'border-red-500' : 'border-blue-500'} -translate-x-1/2 bg-white/90 px-1.5 py-0.5 text-[8px] font-bold text-dark shadow-sm whitespace-nowrap`} style={{left: `calc(50% + ${pin.labelTransformX ?? 0}px)`, top: `calc(50% + ${pin.labelTransformY ?? 0}px)`}}>{pin.name}</span>*/}
                                                <span className={`absolute rounded border-[1px] ${pin.type === "venue" ? 'border-red-500' : 'border-blue-500'} translate-y-[-3px] bg-white/90 px-1.5 py-0.5 text-[8px] font-bold text-dark shadow-sm whitespace-nowrap ${pin.labelPlace === "left" ? "right-full translate-x-1.5 pr-2.5" : "left-full -translate-x-1.5 pl-2.5" }`}>{pin.name}</span>
                                                <svg
                                                    className={`w-8 h-8 ${pin.type === "venue" ? 'text-red-500' : 'text-blue-500'} drop-shadow-md`}
                                                    xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                    viewBox="0 0 56 56">
                                                    {/* <!-- Icon from Framework7 Icons by Vladimir Kharlampidi - https://github.com/framework7io/framework7-icons/blob/master/LICENSE -->*/}
                                                    <path fill="currentColor"
                                                          d="M27.953 52.363c1.055 0 2.04-.445 2.977-2.062l4.336-7.242h7.828c6.984 0 10.734-3.868 10.734-10.735V14.371c0-6.867-3.75-10.734-10.734-10.734H12.906c-6.96 0-10.734 3.844-10.734 10.734v17.953c0 6.89 3.773 10.735 10.734 10.735h7.735l4.336 7.242c.937 1.617 1.921 2.062 2.976 2.062"/>
                                                </svg>
                                                <span className="absolute mt-1 top-0 rounded  px-1.5 py-0.5 text-[10px] font-bold text-white  whitespace-nowrap">{pin.label}</span>

                                            </>
                                        ) :
                                        (
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                     viewBox="0 0 24 24">
                                                    {/*<!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->*/}
                                                    <path fill="currentColor"
                                                          d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zm0 0V5zm2-2h10q.3 0 .45-.275t-.05-.525l-2.75-3.675q-.15-.2-.4-.2t-.4.2L11.25 16L9.4 13.525q-.15-.2-.4-.2t-.4.2l-2 2.675q-.2.25-.05.525T7 17"/>
                                                </svg>
                                            </div>
                                        )}
                                </button>
                            ))}

                            {/* 現在地（GPS）ピン */}
                            {currentPos && (
                                <div
                                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                    style={{left: `${currentPos.xRatio}%`, top: `${currentPos.yRatio}%`}}
                                >
                                    <div
                                        className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md animate-pulse"/>
                                </div>
                            )}
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            )}
        </div>
    );
};
