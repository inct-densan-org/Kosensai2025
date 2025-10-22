"use client"
import { Shop, Label, Static } from "@/types/type";
import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import Image, { StaticImageData } from "next/image"
import { Modal } from "../Modal";
import { postersData } from "@/posters.data";
import "./style.css"

type NumberedPinProps = {
  number?: number|string
  color?: "red"|"blue"|"green"
  force?:boolean
  size:number,
}

export const NumberedPin: React.FC<NumberedPinProps> = ({
  number = 1,
  color = "red",
  force = false,
  size,
}) => {

  const colorCode = force?
    "#df8500"
  :
    color==="blue"?"#4C4CD9":color==="green"?"#4CD94C":'#D94C4C'

  return (
    <svg 
      width={force?size/20:size/26.67}
      height={force?size/16.67:size/22.22}
      viewBox="0 0 60 72"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`block ${force ? "bounce" : ""}`}
    >
      {/* ピンの影 */}
      {/* <ellipse cx="30" cy="68" rx="8" ry="3" fill="#00000020"/> */}
      
      {/* ピン本体 */}
      <path 
        d="M30 2C17.3 2 7 12.3 7 25C7 32 10 38 15 45C20 52 25 58 30 68C35 58 40 52 45 45C50 38 53 32 53 25C53 12.3 42.7 2 30 2Z" 
        fill={colorCode}
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      
      {/* 内側の円 */}
      <circle cx="30" cy="25" r="15" fill="#FFFFFF" opacity="0.95"/>
      
      {/* テキスト */}
      <text
        x="30"
        y="25"
        textAnchor="middle"
        dominantBaseline="central"
        fill={colorCode}
        fontSize={typeof number == "number"?"110%": number.length==2?"80%":"50%"}
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        {String(number)}
      </text>
    </svg>
  )
}

export function MapPage({
  base,
  shops = null,
  labels = null,
  statics = null,
  currentId = null,
  w
}: {
  base: StaticImageData,
  shops?: Shop[] | null,
  labels?: Label[] | null,
  statics?: Static[] | null
  currentId?: number | null
  w:number
}) {
  const [size, setSize] = useState(0)
  const isCurrentMap = shops?.some(shop => shop.idx === currentId) ?? false;

  // 初期スケールと currentShop を一度だけ設定
  useEffect(() => {
    const w = window.innerWidth
    setSize(w>=800?700:w-100)
  }, [])


  return (
    <div className={`bg-gray-100 overflow-hidden flex items-center justify-center mx-auto p-0 w-full aspect-square max-w-[700px] my-2 rounded-2xl ${isCurrentMap?"border-yellow-200 border-8":"border-gray-700 border"} origin-center`}>
      <TransformWrapper
        initialScale={1}
        minScale={0.1}
        maxScale={10}
        wheel={{ step: 0.2 }}
        pinch={{ step: 0.2 }}
      >
        <TransformComponent>
          {/* ベース */}
          <div className="relative" style={{ width:size, height:size }}>
            <Image
              src={base}
              alt="構内図"
              fill
              className={`object-contain`}
            />
            {/* 企画（要改修） */}
            {shops && shops.map((e, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  top: `${e.y}%`,
                  left: `${e.x}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <Modal
                  button={
                    <NumberedPin number={postersData[e.idx].mapId} force={e.idx === currentId} size={size}/>
                  }
                  title={postersData[e.idx].title}
                >
                  <p className="whitespace-pre-wrap">{postersData[e.idx].desc}</p>
                  <div className={`inline-flex mt-4 space-x-2 overflow-x-auto mx-auto ${postersData[e.idx].images.length === 1 ? "justify-center " : ""}w-full`}>
                    {postersData[e.idx].images.map((img, idx) => (
                      <div className="relative flex-shrink-0 w-[70%] sm:w-[40%] aspect-[0.707]" key={idx}>
                        <Image src={img} alt={`${postersData[e.idx].title} - image ${idx + 1}`} fill className="object-contain rounded" />
                      </div>
                    ))}
                  </div>
                </Modal>
              </div>
            ))}
            {/* 静的ピン */}
            {statics && statics.map((e, idx) => (
              <div
                key={idx}
                className="absolute"
                style={{
                  top: `${e.y}%`,
                  left: `${e.x}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                {e.timeTable?
                  <Modal button={<NumberedPin color={e.color} number={e.id} size={size}/>} title="バス時刻表">
                    <div>一ノ関駅行きシャトルバスはこちらから</div>
                  </Modal>:
                  <NumberedPin color={e.color} number={e.id} size={size}/>
                }
              </div>
            ))}
            {/* ラベル */}
            {labels && labels.map((e, idx) => (
              <div
                key={idx}
                className="absolute"
                style={{
                  top: `${e.y}%`,
                  left: `${e.x}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <TEXT text={e.name} size={size}/>
              </div>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}



function TEXT({text,size}:{text:string,size:number}){
  return (
    <div className="text-black font-bold bg-gray-300 border-black" style={{ fontSize: `${size /45}px` ,padding: `${size/120}px`, borderRadius: `${size/200}px`}}>
      {text}
    </div>
  )
}
