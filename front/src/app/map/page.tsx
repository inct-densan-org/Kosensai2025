"use client"
import { MapPage } from "@/components/Maps/Index";
import { map1, map2, map3, map4, map5 } from "./map-data";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import * as maps from "./map-data"

export default function Page(){
  const index = Number(useSearchParams().get("index"));
  useEffect(()=>{
    setTimeout(() => {
      const matched = Object.values(maps).find((d) =>
        d.shops.some((shop) => shop.idx === index)
      );
      const id = matched?.id;
      const el = document.getElementById(id ?? "map1");
      el?.scrollIntoView({ behavior: 'smooth' });      
    }, 50);
  },[index])
  return (
    <div className="py-0 px-12">
      <span id="map1"></span>
      <MapPage base={map1.image} shops={map1.shops} labels={map1.labels} statics={map1.statics}/>
      <span id="map2"></span>
      <MapPage base={map2.image} shops={map2.shops} labels={map2.labels} statics={map2.statics}/>
      <span id="map3"></span>
      <MapPage base={map3.image} shops={map3.shops} labels={map3.labels} statics={map3.statics}/>
      <span id="map4"></span>
      <MapPage base={map4.image} shops={map4.shops} labels={map4.labels} statics={map4.statics}/>
      <span id="map5"></span>
      <MapPage base={map5.image} shops={map5.shops} labels={map5.labels} statics={map5.statics}/>
    </div>
  )}