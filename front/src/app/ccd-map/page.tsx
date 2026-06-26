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
            xRatio: 50,
            yRatio: 56.5,
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
            yRatio: 59.8,
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
            owner: "質問･相談会場"
            
        },
        {
            id: 11,
            label: "",
            name: "",
            xRatio: 48.5,
            yRatio: 60,
            labelPlace: "left",
            isHavePhoto: false,
            type: "door",
        },
        {
            id: 12,
            label: "",
            name: "",
            xRatio: 42.6,
            yRatio: 72,
            labelPlace: "left",
            isHavePhoto: false,
            type: "door",
        },
        {
            id: 13,
            label: "",
            name: "",
            xRatio: 44.5,
            yRatio: 75.5,
            labelPlace: "left",
            isHavePhoto: false,
            type: "door",
        },
        {
            id: 14,
            label: "",
            name: "",
            xRatio: 50.7,
            yRatio: 76.5,
            labelPlace: "left",
            isHavePhoto: false,
            type: "door",
        },
        {
            id: 15,
            label: "",
            name: "",
            xRatio: 50.7,
            yRatio: 78.9,
            labelPlace: "left",
            isHavePhoto: false,
            type: "door",
        },
        {
            id: 16,
            label: "",
            name: "",
            xRatio: 49.5,
            yRatio: 82.5,
            labelPlace: "left",
            isHavePhoto: false,
            type: "door",
        },
        {
            id: 17,
            label: "",
            name: "",
            xRatio: 46,
            yRatio: 68.5,
            labelPlace: "left",
            isHavePhoto: false,
            type: "door",
        },
        {
            id: 18,
            label: "",
            name: "",
            xRatio: 56.5,
            yRatio: 65.5,
            labelPlace: "left",
            isHavePhoto: false,
            type: "door",
        },
        {
            id: 19,
            label: "",
            name: "",
            xRatio: 56.9,
            yRatio: 71.8,
            labelPlace: "left",
            isHavePhoto: false,
            type: "door",
        },
        {
            id: 20,
            label: "",
            name: "",
            xRatio: 56.9,
            yRatio: 73,
            labelPlace: "left",
            isHavePhoto: false,
            type: "door",
        },
        {
            id: 21,
            label: "",
            name: "",
            xRatio: 58,
            yRatio: 75,
            labelPlace: "left",
            isHavePhoto: false,
            type: "prohibit",
        },
        {
            id: 22,
            label: "",
            name: "",
            xRatio: 57.8,
            yRatio: 73.5,
            labelPlace: "left",
            isHavePhoto: false,
            type: "stairs",
        },
        {
            id: 23,
            label: "",
            name: "",
            xRatio: 65.3,
            yRatio: 71,
            labelPlace: "left",
            isHavePhoto: false,
            type: "stairs",
        },
        {
            id: 24,
            label: "",
            name: "",
            xRatio: 57.5,
            yRatio: 66,
            labelPlace: "left",
            isHavePhoto: false,
            type: "stairs",
        },
        {
            id: 25,
            label: "",
            name: "",
            xRatio: 50,
            yRatio: 71,
            labelPlace: "left",
            isHavePhoto: false,
            type: "stairs",
        },
        {
            id: 26,
            label: "",
            name: "",
            xRatio: 45.5,
            yRatio: 71,
            labelPlace: "left",
            isHavePhoto: false,
            type: "stairs",
        },
        {
            id: 27,
            label: "",
            name: "",
            xRatio: 49.5,
            yRatio: 60.5,
            labelPlace: "left",
            isHavePhoto: false,
            type: "stairs",
        },
        {
            id: 28,
            label: "",
            name: "",
            xRatio: 51.6,
            yRatio: 71.5,
            labelPlace: "left",
            isHavePhoto: false,
            type: "WC",
        },
        {
            id: 29,
            label: "",
            name: "",
            xRatio: 46,
            yRatio: 70,
            labelPlace: "left",
            isHavePhoto: false,
            type: "WC",
        },
        {
            id: 30,
            label: "",
            name: "",
            xRatio: 52.5,
            yRatio: 81,
            labelPlace: "left",
            isHavePhoto: false,
            type: "WC",
        },
        {
            id: 31,
            label: "",
            name: "",
            xRatio: 52.5,
            yRatio: 84,
            labelPlace: "left",
            isHavePhoto: false,
            type: "WC",
        },

        {
            id: 32,
            label: "",
            name: "",
            xRatio: 34.8,
            yRatio: 72,
            labelPlace: "left",
            isHavePhoto: false,
            type: "door",
        },
        {
            id: 33,
            label: "",
            name: "",
            xRatio: 31,
            yRatio: 61.2,
            labelPlace: "left",
            isHavePhoto: false,
            type: "door",
        },
        {
            id: 34,
            label: "",
            name: "",
            xRatio: 32,
            yRatio: 51.5,
            labelPlace: "left",
            isHavePhoto: false,
            type: "door",
        },

        {
            id: 35,
            label: "",
            name: "",
            xRatio: 69.5,
            yRatio: 73,
            labelPlace: "left",
            isHavePhoto: false,
            type: "prohibit",
        },


    ].reverse() as MapPin[]

    const selectedLocationId = selectedPin?.id ?? -1;
    const selectedLocationLabel = selectedPin?.label ?? '';
    const selectedLocationName = selectedPin?.name ?? '';


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
                    <p className={"text-center text-gray-600 text-sm"}>※GPS機能には測定誤差が含まれます。 <br/> また、屋内では著しく精度が低下する場合があります。</p>
                }
                {permission === "loading" &&
                    <p className={"text-gray-500 text-sm"}>ロード中... </p>
                }
                {permission === "denied" &&
                    <p className={"text-gray-500 text-sm"}>位置情報はオフになっています</p>
                }
                
                <div>
                    <h2 className={"text-center mt-4 mb-2 text-lg "}>スケジュール</h2>
                    <table className={"mx-auto w-fit px-4"}>
                        <tbody >
                        <tr>
                            <td className="pr-5 py-1 pl-5">13:00</td>
                            <td className="pr-5">受付（第一体育館）</td>
                        </tr>
                        <tr>
                            <td className="pr-5 py-1 pl-5">13:30 - 14:20</td>
                            <td className="pr-5">学校全体説明（約50分）</td>
                        </tr>
                        <tr>
                            <td className="pr-5 py-1 pl-5">14:20 -</td>
                            <td className="pr-5">自由見学（約90分）</td>
                        </tr>
                        <tr>
                            <td className="pr-5 py-1 pl-5"></td>
                            <td className={"text-sm pr-5"}>（自由見学の時間帯に、希望に応じ個別相談会も実施いたします）</td>
                        </tr>
                        <tr>
                            <td className="pr-5 py-1 pl-5">15:50 -</td>
                            <td className="pr-5">質疑応答・アンケート回答</td>
                        </tr>
                        <tr>
                            <td className="pr-5 py-1 pl-5">16:00 -</td>
                            <td className="pr-5">終了（解散）</td>
                        </tr>
                        <tr>
                            <td className="pr-5 py-1 pl-5"></td>
                            <td className={"text-sm pr-5"}>以下の参加者アンケートにご協力をお願いいたします。</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2 className={"text-center mt-8  text-lg"}>アンケート</h2>
                    <Link className={"text-blue-500 underline" } href={"https://forms.office.com/r/UC3ZDWyyDK"}>https://forms.office.com/r/UC3ZDWyyDK</Link>
                </div>
                
            </div>

            <div className={"w-full h-auto flex flex-col items-center justify-center gap-2 mt-16"}>
                <Link className={"block text-blue-500 underline "} href={"https://www.ichinoseki.ac.jp"}>一関高専
                    ホームページ</Link>
                <Link className={"block text-blue-500 underline  text-sm mb-8"} href={"/"}>ページトップ (昨年度高専祭HP)</Link>
            </div>
                <Link href={"https://inct-densan.club/"} className={"ml-auto block w-fit -translate-y-4"}>
                    <img
                        className={"invert"}
                        width={16}
                        height={16}
                        src={"https://inct-densan.club/resource/logo.webp"}
                    >
                    </img>
                </Link>
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