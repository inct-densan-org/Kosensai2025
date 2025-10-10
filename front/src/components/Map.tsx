import { MapPin } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ShopData } from "@/types/type";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { ShopCard } from "./Shop";
import { StaticImageData } from "next/image"
import Image from "next/image"

function Place(place:string|null|undefined){
  if(!place) return
  return(
    <div className="flex items-center">
      <MapPin/>a
      <div>{place}</div>
    </div>  
  )
}
export function Pin({data,icon=undefined,width=100,height=100}:{data:ShopData,icon?:undefined|string|StaticImageData,width?:number, height?:number}){
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild className="">
          <button className=" rounded-md">{icon?<Image src={icon} alt="shop image" width={width} height={height}/>:<MapPin size={40}/>}</button>
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