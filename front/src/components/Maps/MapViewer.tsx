'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

export type MapPin = {
    id: number;
    label: string;
    xRatio: number; // 0-100
    yRatio: number; // 0-100
    isHighlighted?: boolean;
    locationIds?: number[];
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
                    wheel={{ step: 0.1 }}
                >
                    <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
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
                                style={{ width: '100%', height: '100%', display: 'block' }}
                            />

                            {/* 会場ピンの描画 */}
                            {pins.map((pin) => (
                                <button
                                    key={pin.id}
                                    onClick={() => onPinClick?.(pin)}
                                    className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 active:scale-95"
                                    style={{ left: `${pin.xRatio}%`, top: `${pin.yRatio}%` }}
                                >
                                    <svg className={`w-8 h-8 ${pin.isHighlighted ? 'text-primary' : 'text-blue-500'} drop-shadow-md`} viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                    <span className="mt-1 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-dark shadow-sm whitespace-nowrap">
                                        {pin.label}
                                    </span>
                                </button>
                            ))}

                            {/* 現在地（GPS）ピン */}
                            {currentPos && (
                                <div
                                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                    style={{ left: `${currentPos.xRatio}%`, top: `${currentPos.yRatio}%` }}
                                >
                                    <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md animate-pulse" />
                                </div>
                            )}
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            )}
        </div>
    );
};
