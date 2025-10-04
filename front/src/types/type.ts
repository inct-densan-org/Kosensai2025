import { StaticImageData } from "next/image"

export type ShopData = {
  name: string
  place?:string
  description:string
  image: string|StaticImageData
}