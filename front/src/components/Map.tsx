import { MapPin } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { ShopData } from "@/types/type";
import Image from "next/image";

function Place(place:string|null|undefined){
  if(!place) return
  return(
    <div className="flex items-center">
      <MapPin/>
      <div>{place}</div>
    </div>
  )
}
export function Pin({data, width=100, height=100 }:{data:ShopData, width?:number, height?:number}){
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild className="m-6">
          <button className="hover:bg-gray-100 rounded-md"><MapPin size={40}/></button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{data.name}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{Place(data.place)}</DialogDescription>
          <div>{data.description}</div>
          <Image src={data.image} alt="shop image" width={width} height={height} className="mx-auto"/>
        </DialogContent>
      </form>
    </Dialog>
  )
}