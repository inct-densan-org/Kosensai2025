import { ShopData } from "@/types/type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image"
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

export function ShopCard({data, width=100, height=100 ,className=undefined}:{data:ShopData,width?:number,height?:number,className?:string|undefined}){
  return(
    <Card className={cn("sm:max-w-[425px]",className)}>
      <CardContent>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <Separator className="my-2"/>
        <div>{data.desc}</div>
        {data.images[0] && <Image src={data.images[0]} alt="shop image" width={width} height={height} className="mx-auto"/>}
      </CardContent>
    </Card>
  )
}