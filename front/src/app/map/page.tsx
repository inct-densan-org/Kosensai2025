import { MapPage } from "@/components/Maps/Index";
import { map1, map2, map3, map4, map5 } from "./map-data";

export default function Page(){
  return (
    <div className="py-6 px-12">
      <MapPage base={map1.image} shops={map1.shops} labels={map1.labels} statics={map1.statics}/>
      <MapPage base={map2.image} shops={map2.shops} labels={map2.labels} statics={map2.statics}/>
      <MapPage base={map3.image} shops={map3.shops} labels={map3.labels} statics={map3.statics}/>
      <MapPage base={map4.image} shops={map4.shops} labels={map4.labels} statics={map4.statics}/>
      <MapPage base={map5.image} shops={map5.shops} labels={map5.labels} statics={map5.statics}/>
    </div>
  )}