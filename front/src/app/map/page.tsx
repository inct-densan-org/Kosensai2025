"use client"
import { MapPage } from "@/components/Maps/Index";
import { map1, map2, map3, map4, map5 } from "./map-data";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as maps from "./map-data"
import SlideMenu from "@/components/Maps/Menu";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./style.css"

export default function Page(){
  const [index, setIndex] = useState(Number(useSearchParams().get("index") ?? -1));
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [open, onOpenChange] = useState(false)
  useEffect(()=>{
    setTimeout(() => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
      onOpenChange(index!=-1)
      const matched = Object.values(maps).find((d) =>
        d.shops.some((shop) => shop.idx === index)
      );
      const id = matched?.id;
      const el = document.getElementById(id ?? "map1");
      el?.scrollIntoView({ behavior: 'smooth' });     
    }, 50);
  },[index])
  if(!width || !height) return 
  return (
    <div className={`px-12 py-0 ${width>height? "justify-center": ""}`}>
      {!open && <div className="w-full fixed z-50 bg-white top-0 left-0"><Button onClick={()=>onOpenChange(!open)} className="ml-12 mt-6 mb-3"><Search/>ポスター画像から企画を探す</Button></div>}
      <SlideMenu open={open} onOpenChange={onOpenChange} mode={width>height?"left":"top"} onChangeIndex={setIndex}/>
      
      <div style={open? width>height?{ paddingLeft:450 }:{ paddingTop:500 } : { paddingTop:100 }} >
        <span className={`${width<height?"scroll-offset":""}`} id="map1"></span>
        <MapPage base={map1.image} shops={map1.shops} labels={map1.labels} statics={map1.statics} currentId={index} w={width-(width>height?450:0)}/>
        <span className={`${width<height?"scroll-offset":""}`} id="map2"></span>
        <MapPage base={map2.image} shops={map2.shops} labels={map2.labels} statics={map2.statics} currentId={index} w={width-(width>height?450:0)}/>
        <span className={`${width<height?"scroll-offset":""}`} id="map3"></span>
        <MapPage base={map3.image} shops={map3.shops} labels={map3.labels} statics={map3.statics} currentId={index} w={width-(width>height?450:0)}/>
        <span className={`${width<height?"scroll-offset":""}`} id="map4"></span>
        <MapPage base={map4.image} shops={map4.shops} labels={map4.labels} statics={map4.statics} currentId={index} w={width-(width>height?450:0)}/>
        <span className={`${width<height?"scroll-offset":""}`} id="map5"></span>
        <MapPage base={map5.image} shops={map5.shops} labels={map5.labels} statics={map5.statics} currentId={index} w={width-(width>height?450:0)}/>
      </div>
    </div>
  )}