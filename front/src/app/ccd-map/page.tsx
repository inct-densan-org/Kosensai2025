"use client"

import {useCampusGps} from "@/utils/useCampusGps";
import {MapViewer} from "@/components/Maps/MapViewer";
import Link from "next/link";

export default function CcdMapPage() {
    const {currentPos, errorMsg} = useCampusGps(true);
    return (
        <div className={"w-screen h-screen"}>
            <h3 className={"text-center text-lg py-2 bg-[#000077] text-white"}>一関高専 - キャンパスカミングデー</h3>
            <div className={"relative w-screen h-auto flex items-center justify-center"}>
                {errorMsg && <p className={"absolute top-4 left-4 text-red-500"}>{errorMsg}</p>}
                <section className={"w-full h-full flex items-center justify-center"}>
                    <MapViewer imageUrl={"/img/maps/entire-map.png"} imageWidth={700} imageHeight={550}
                               currentPos={currentPos}/>
                </section>

            </div>
            <div className={"w-full h-auto flex flex-col items-center justify-center"}>

                <p className={"text-center text-gray-800 text-sm"}>位置情報の使用を許可すると、地図上に現在位置が表示されます。</p>
                <p className={"text-center text-gray-600 text-sm"}>※GPS機能には測定誤差が含まれます</p>

                <p className={"mt-4"}>ここにスケジュール等を置く?</p>
                <p>ここに残り時間等を置く?</p>
                <p>ここに場所一覧等を置く?</p>
            </div>
            
            <div className={"w-full h-auto flex flex-col items-center justify-center gap-2 mt-16"}>
                <Link className={"block text-blue-500 underline "} href={"https://www.ichinoseki.ac.jp"}>一関高専 ホームページ</Link>
                <Link className={"block text-blue-500 underline  text-sm"} href={"/"}>ページトップ (高専祭HP)</Link>
            </div>
        </div>
    )
}