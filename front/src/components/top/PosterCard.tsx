
import Image, {StaticImageData} from "next/image";
import {Pin} from "@/components/Map";
import {ShopData} from "@/types/type";

type Poster = {
  id: number;
  title: string;
  image: string; // path to image
};

export function PosterCard({ poster }: { poster: Poster }) {
    const data: ShopData = {
        name: poster.title,
        // place?:string
        description: poster.title,
        image: poster.image,
    }
  return (
    <div className="w-[210px] h-[297px] bg-gray-200 rounded-lg overflow-hidden shadow-lg select-none ">
        <Pin data={data} icon={poster.image} width={210} height={297} />
      {/*<Image*/}
      {/*  src={poster.image}*/}
      {/*  alt={poster.title}*/}
      {/*  */}
      {/*  width={210}*/}
      {/*  height={297}*/}
      {/*  className="object-cover w-full h-full"*/}
      {/*/>*/}
    </div>
  );
}
