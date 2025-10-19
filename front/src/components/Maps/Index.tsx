"use client"
import { Shop, Label, Static } from "@/types/type";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/empty-dialog";
import { useEffect, useState } from "react";
import { ShopData } from "@/types/type";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { ShopCard } from "../Shop";
import Image, { StaticImageData } from "next/image"
import { Modal } from "../Modal";
import { postersData } from "@/posters.data";

export function Pin({data,id}:{data:ShopData,id:string|number}){
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild className="m-6">
          {/* <button className="hover:bg-gray-100 rounded-md">{icon?<Image src={icon} alt="shop image" width={size} height={size}/>:<MapPin size={40}/>}</button> */}
          <button className=""><NumberedPin number={id}/></button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>a</DialogTitle>
            </VisuallyHidden>
          </DialogHeader>
          <ShopCard data={data}/>
        </DialogContent>
      </form>
    </Dialog>
  )
}

type NumberedPinProps = {
  number?: number|string
  color?: "red"|"blue"|"green"
  className?: string
  ariaLabel?: string
}

export const NumberedPin: React.FC<NumberedPinProps> = ({
  number = 1,
  color = "red",
  className = '',
  ariaLabel,
}) => {

  const colorCode = color==="blue"?"#4C4CD9":color==="green"?"#4CD94C":'#D94C4C'

  return (
<svg 
      width={30}
      height={36}
      viewBox="0 0 60 72" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      {/* ピンの影 */}
      <ellipse cx="30" cy="68" rx="8" ry="3" fill="#00000020"/>
      
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
        fontSize={typeof number == "number"?"18": number.length==2?"11":"8"}
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
  shops=null,
  labels=null,
  statics=null
}:{
  base:StaticImageData,
  shops?:Shop[]|null
  labels?:Label[]|null
  statics?:Static[]|null
}) {
  const [initialScale, setInitialScale] = useState(-1)

  useEffect(()=>{
    const width = window.innerWidth;
    if (width < 768) setInitialScale(0.5);   // スマホ
    else if (width < 1200) setInitialScale(0.8); // タブレット
    else setInitialScale(1);        
  })
  if(initialScale==-1) return
  return (
    <div className="bg-gray-100 overflow-hidden flex items-center justify-center mx-auto p-6">
      <TransformWrapper
        initialScale={initialScale}
        minScale={0.3}
        maxScale={4}
        wheel={{ step: 0.2 }}
        pinch={{ step: 0.2 }}
      >
        <TransformComponent>
          {/* ベース */}
          <div className="relative" style={{ width:800, height:800}}>
            <Image
              src={base}
              alt="構内図"
              fill
              className="object-contain"
            />

            {/* 企画（要改修） */}
            {shops && shops.map((e,index) => (
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
                    <NumberedPin number={postersData[e.idx].mapId}/>
                  }
                  title={postersData[e.idx].title}
                >
                  <p className="whitespace-pre-wrap">{postersData[e.idx].desc}</p>
                  {
                    <div className="flex mt-4 space-x-2 overflow-x-auto mx-auto justify-center">
                      {postersData[e.idx].images.map((img, index) => (
                        <div className="relative w-2/5 aspect-[0.707]" key={index}>
                          <Image src={img} alt={`${postersData[e.idx].title} - image ${index + 1}`} fill className="object-cover rounded" />
                        </div>
                      ))}
                    </div>
                  }       
                </Modal>
                </div>
            ))}

            {/* 静的ピン */}
            {statics && statics.map((e,idx)=>(
              <div
                key={idx}
                className="absolute"
                style={{
                  top: `${e.y}%`,
                  left: `${e.x}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <NumberedPin color={e.color} number={e.id}/>
              </div>
            ))}

            {/* ラベル */}
            {labels && labels.map((e,idx)=>(
              <div
                key={idx}
                className="absolute"
                style={{
                  top: `${e.y}%`,
                  left: `${e.x}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <TEXT text={e.name}/>
              </div>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

function TEXT({text}:{text:string}){
  return (
    <div className="text-black font-bold bg-gray-300 p-1 rounded border-black">
      {text}
    </div>
  )
}
