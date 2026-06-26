"use client"

import {useCampusGps} from "@/utils/useCampusGps";
import {MapPin, MapViewer} from "@/components/CCDMaps/MapViewer";
import Link from "next/link";
import {useState} from "react";
import {PlaceImageModal} from "@/components/CCDMaps/PlaceImageModal";


export default function CcdMapPage() {
    const {currentPos, errorMsg, permission, requestLocation} = useCampusGps(true);
    const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);

    const pins: MapPin[] = [
        {
            id: 1,
            label: "２Ｆ",
            name: "ファーストペンギンファブ",
            xRatio: 49.5,
            yRatio: 56,
            labelPlace: "left",
            isHavePhoto: true,
            type: "venue",
            owner: "機械･知能系"
    },
        {
            id: 2,
            label: "１Ｆ",
            name: "講義室2",
            xRatio: 49.1,
            yRatio: 85.7,
            labelPlace: "right",
            isHavePhoto: true,
            type: "venue",
            owner: "電気･電子系"
            
        },
        {
            id: 3,
            label: "２Ｆ",
            name: "サイバーセキュリティラボ",
            xRatio: 68,
            yRatio: 73.5,
            labelPlace: "right",
            isHavePhoto: true,
            type: "venue",
            owner: "情報･ソフトウェア系"
        },
        {
            id: 4,
            label: "１Ｆ",
            name: "一般化学実験室",
            xRatio: 58.4,
            yRatio: 65,
            labelPlace: "right",
            isHavePhoto: true,
            type: "venue",
            owner: "化学･バイオ系",
        },
        {
            id: 5,
            label: "",
            name: "Idemitsu ミライチ",
            xRatio: 57.9,
            yRatio: 49.4,
            labelPlace: "right",
            isHavePhoto: true,
            type: "venue",
            owner: "化学･バイオ系",
            desc: " (化学工学実習工場) "
        },
        {
            id: 6,
            label: "",
            name: "メディアセンター",
            xRatio: 33,
            yRatio: 72,
            labelPlace: "left",
            isHavePhoto: true,
            type: "venue",
            owner: "１Ｆ 図書館"
            
        },
        {
            id: 7,
            label: "",
            name: "学生寮",
            xRatio: 18,
            yRatio: 34,
            labelPlace: "right",
            isHavePhoto: true,
            type: "venue",
            owner: "エリア",
            desc: "(男子寮のみ見学可)"
        },
        {
            id: 8,
            label: "３Ｆ",
            name: "工学デザイン室",
            xRatio: 51.2,
            yRatio: 58,
            labelPlace: "right",
            isHavePhoto: true,
            type: "venue",
            owner: "機械技術部"
        },
        {
            id: 9,
            label: "",
            name: "第一体育館",
            xRatio: 32.1,
            yRatio: 48,
            labelPlace: "right",
            isHavePhoto: true,
            type: "place",
            owner: "全体説明会会場"
        },
        {
            id: 10,
            label: "１Ｆ",
            name: "第一講義室",
            xRatio: 40.5,
            yRatio: 72.8,
            labelPlace: "left",
            isHavePhoto: true,
            type: "place",
            owner: "全体説明会会場"
        },



    ]
    
    const selectedLocationId = selectedPin?.id ?? -1;
    const selectedLocationLabel = selectedPin?.label ??  '';
    const selectedLocationName = selectedPin?.name ??  '';
    
    
    
    return (
        <div className={"w-screen h-screen"}>
            <h3 className={"text-center text-lg py-2 bg-[#000077] text-white"}>一関高専 - キャンパスカミングデー</h3>
            <div className={"relative w-screen h-auto max-h-[70dvh] flex items-center justify-center mt-2"}>
                {errorMsg && <p className={"absolute top-4 left-4 text-red-500"}>{errorMsg}</p>}
                <section className={"w-full h-full  flex items-center justify-center"}>
                    <MapViewer imageUrl={"/img/maps/entire-map.webp"} imageWidth={700} imageHeight={550} pins={pins}
                               onPinClick={(pin) => pin.isHavePhoto && setSelectedPin(pin)}
                               currentPos={currentPos}/>
                    
                </section>
            </div>
            <div className={"w-full h-auto flex flex-col items-center justify-center mt-2"}>
                {permission === "prompt" &&
                    <button onClick={requestLocation}
                            className={"border-[1px] border-black px-2 mt-2 mb-1 rounded shadow-lg bg-white"}>現在地を表示する</button>
                }
                {permission === "granted" &&
                    <p className={"text-center text-gray-600 text-sm"}>※GPS機能には測定誤差が含まれます</p>
                }
                {permission === "loading" &&
                    <p className={"text-gray-500 text-sm"}>ロード中... </p>
                }
                {permission === "denied" &&
                    <p className={"text-gray-500 text-sm"}>位置情報はオフになっています</p>
                }


                <p className={"mt-4"}>ここにスケジュール等を置く?</p>
                <p>ここに残り時間等を置く?</p>
                <p>ここに場所一覧等を置く?</p>
            </div>
            
            <div className={"w-full h-auto flex flex-col items-center justify-center gap-2 mt-16"}>
                <Link className={"block text-blue-500 underline "} href={"https://www.ichinoseki.ac.jp"}>一関高専
                    ホームページ</Link>
                <Link className={"block text-blue-500 underline  text-sm"} href={"/"}>ページトップ (高専祭HP)</Link>
            </div>
            <PlaceImageModal
                isOpen={selectedPin !== null}
                onClose={() => setSelectedPin(null)}
                locationName={selectedLocationName}
                locationLabel={selectedLocationLabel}
                locationId={selectedLocationId}
                locationOwner={selectedPin?.owner}
                locationDesc={selectedPin?.desc}
            />
        </div>
    )
}