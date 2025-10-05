import { Pin } from "@/components/Map";
import { ShopCard } from "@/components/Shop";
import { ShopData } from "@/types/type";
import image from "public/image.png"

export default function Page(){
  const sample:ShopData = {
    name: 'ぼくが考えたさいきょうのお店',
    place: "専攻科教育棟10階",
    description:"何でも売ってますまる",
    image:image
  }
  return (
    <div>
      <Pin data={sample} icon={image} size={150}/>
      <ShopCard data={sample}/>
    </div>
  )}