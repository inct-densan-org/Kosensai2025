import { z } from "zod/v4"

export const request = z.object({
  name: z.string(),
  age: z.number()
})

export type NewsData = {
  id:string
  title:string
  tag:string|null
  body:string
  publishedAt:string
}

export type NewsList = {
  id:string
  title:string
  tag:string|null
  publishedAt:string
}