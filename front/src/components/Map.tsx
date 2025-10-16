import { MapPin } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/empty-dialog";
import { ShopData } from "@/types/type";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { ShopCard } from "./Shop";
import { StaticImageData } from "next/image"
import Image from "next/image"

function Place(place:string|null|undefined){
  if(!place) return
  return(
    <div className="flex items-center">
      <MapPin/>
      <div>{place}</div>
    </div>
  )
}
export function Pin({data,icon=undefined,size=100}:{data:ShopData,icon?:undefined|string|StaticImageData,size?:number}){
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild className="m-6">
          <button className="hover:bg-gray-100 rounded-md">{icon?<Image src={icon} alt="shop image" width={size} height={size}/>:<MapPin size={40}/>}</button>
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