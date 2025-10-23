"use client"
import { MapPage } from "@/components/Maps/Index";
import * as maps from "./map-data";
import { map1, map2, map3, map4, map5 } from "./map-data";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SlideMenu from "@/components/Maps/Menu";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./style.css"
import { AnimatedContentSection } from "@/components/top/AnimatedContentSection";
import Navigation from "@/components/top/Navigation";

const MAX_INDEX = 54
export function MapPageClient({sameOrigin}:{sameOrigin:boolean}) {
    const cache = Number(useSearchParams().get("index") ?? -1)
    const [index, setIndex] = useState(cache);
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [open, onOpenChange] = useState(false)
    const [isSameOrigin, setIsSameOrigin] = useState(sameOrigin);

    useEffect(() => {
        // 現在のページのオリジンとリファラーを比較
        setIndex(cache)
    }, []);
    useEffect(() => {
        const update = () => {
            index>54 && setIndex(index-55)
            index<0 && setIndex(index+55)
            const currentWidth = window.innerWidth;
            const currentHeight = window.innerHeight;
            setWidth(currentWidth);
            setHeight(currentHeight);
            onOpenChange(index != -1);

            setTimeout(() => {
                const matched = Object.values(maps).find((d) =>
                    d.shops.some((shop) => shop.idx === index)
                );
                const id = matched?.id;
                const el = document.getElementById(id ?? "map1");
                if (!el) return;
                const isVertical = currentWidth < currentHeight;
                if (isVertical) {
                    const rect = el.getBoundingClientRect();
                    const scrollPosition = (window.pageYOffset || document.documentElement.scrollTop || 0) + rect.top;
                    const OFFSET = 340;
                    window.scrollTo({ top: Math.max(scrollPosition - OFFSET, 0), behavior: "smooth" });
                } else {
                    el.scrollIntoView({ behavior: "smooth" });
                }
                setIsSameOrigin(true)
            }, isSameOrigin ? 50 : 3000);
        };
        update();
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [index])

    if (!width || !height) return null;

    return (
        <div className="relative w-full min-h-screen bg-[#0072C3] bg-no-repeat bg-[image:var(--mesh-gradient)]">
            <Navigation />
            {!open && (
                <div className="w-full fixed z-50 top-16 left-0 md:top-36 md:left-6 bg-transparent pointer-events-none">
                    <Button onClick={() => onOpenChange(!open)} className="ml-[48px] mt-6 mb-3 pointer-events-auto">
                        <Search />
                        ポスター画像から企画を探す
                    </Button>
                </div>
            )}
            <SlideMenu open={open} onOpenChange={onOpenChange} mode={width > height ? "left" : "top"}
                onChangeIndex={setIndex} index={index} />
            <div style={open ? (width > height ? { paddingLeft: 300 } : { paddingTop: 450 }) : { paddingTop: '100px' }}>
                <AnimatedContentSection title="マップ" sensibility={.2} className={"text-white pb-32"}>
                    <div
                        className={`px-4 md:px-12 py-0 flex flex-col items-center gap-16 ${width > height ? "justify-center" : ""}`}>
                        <span className={`${width < height ? "scroll-offset" : ""}`} id="map1"></span>
                        <MapPage base={map1.image} shops={map1.shops} labels={map1.labels} statics={map1.statics}
                            currentId={index} w={width - (width > height ? 320 : 0)} long={!isSameOrigin} />
                        <span className={`${width < height ? "scroll-offset" : ""}`} id="map2"></span>
                        <MapPage base={map2.image} shops={map2.shops} labels={map2.labels} statics={map2.statics}
                            currentId={index} w={width - (width > height ? 320 : 0)} long={!isSameOrigin} />
                        <span className={`${width < height ? "scroll-offset" : ""}`} id="map3"></span>
                        <MapPage base={map3.image} shops={map3.shops} labels={map3.labels} statics={map3.statics}
                            currentId={index} w={width - (width > height ? 320 : 0)} long={!isSameOrigin} />
                        <span className={`${width < height ? "scroll-offset" : ""}`} id="map4"></span>
                        <MapPage base={map4.image} shops={map4.shops} labels={map4.labels} statics={map4.statics}
                            currentId={index} w={width - (width > height ? 320 : 0)} long={!isSameOrigin} />
                        <span className={`${width < height ? "scroll-offset" : ""}`} id="map5"></span>
                        <MapPage base={map5.image} shops={map5.shops} labels={map5.labels} statics={map5.statics}
                            currentId={index} w={width - (width > height ? 320 : 0)} long={!isSameOrigin} />
                    </div>
                </AnimatedContentSection>
            </div>
        </div>
    )
}
