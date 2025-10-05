import { ShopData } from "@/types/type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image"
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

function Place(place:string|null|undefined){
  if(!place) return
  return(
    <span className="my-2 flex items-center">
      <MapPin size={15}/>
      <span>{place}</span>
    </span>
  )
}

export function ShopCard({data, width=100, height=100 ,className=undefined}:{data:ShopData,width?:number,height?:number,className?:string|undefined}){
  return(
    <Card className={cn("sm:max-w-[425px]",className)}>
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