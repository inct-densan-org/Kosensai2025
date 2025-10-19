// import Image from "next/image";
// import {ShopData} from "@/types/type";
// import {Modal} from "@/components/Modal";
//
// type Poster = {
//     id: number;
//     title: string;
//     image: string; // path to image
// };
//
// export function PosterCard({poster}: { poster: Poster }) {
//     const data: ShopData = {
//         name: poster.title,
//         // place?:string
//         description: poster.title,
//         image: poster.image,
//     }
//     return (
//         <div
//             className="relative w-[277px] h-[392px] md:w-[400px] md:h-[566px]  bg-gray-200 rounded-lg overflow-hidden shadow-lg select-none drop-shadow-xl drop-shadow-gray-800">
//             <Modal button={
//                 <Image
//                     src={poster.image}
//                     alt={poster.title}
//
//                     fill={true}
//                     sizes="400px"
//                     className="absolute! object-fill! w-full! h-full!"
//                 />
//             }>
//                 <li>hoge</li>
//                 <li>huga</li>
//                 <li>poo</li>
//             </Modal>
//         </div>
//     );
// }


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
