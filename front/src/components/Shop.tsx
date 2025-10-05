import { ShopData } from "@/types/type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image"
import { Separator } from "./ui/separator";

function Place(place:string|null|undefined){
  if(!place) return
  return(
    <span className="my-2 flex items-center">
      <MapPin size={15}/>
      <span>{place}</span>
    </span>
  )
}

export function ShopCard({data, width=100, height=100}:{data:ShopData,width?:number,height?:number}){
  return(
    <Card className="sm:max-w-[425px]">
      <CardContent>
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
        </CardHeader>
        <Separator className="my-2"/>
        <CardDescription>{Place(data.place)}</CardDescription>
        <div>{data.description}</div>
        <Image src={data.image} alt="shop image" width={width} height={height} className="mx-auto"/>
      </CardContent>
    </Card>
  )
}