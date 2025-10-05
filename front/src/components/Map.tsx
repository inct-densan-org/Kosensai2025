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

function Place(place:string|null|undefined){
  if(!place) return
  return(
    <div className="flex items-center">
      <MapPin/>
      <div>{place}</div>
    </div>
  )
}
export function Pin({data}:{data:ShopData}){
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild className="m-6">
          <button className="hover:bg-gray-100 rounded-md"><MapPin size={40}/></button>
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