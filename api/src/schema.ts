import { z } from "zod/v4"

export const request = z.object({
  name: z.string(),
  age: z.number()
})

export type NewsData = {
  id:string
  title:string
  description:string|null
  body:string
  createdAt:string
  updatedAt:string
}

export type NewsList = {
  id:string
  title:string
  description:string|null
  createdAt:string
}