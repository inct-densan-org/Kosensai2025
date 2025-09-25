import { z } from "zod/v4"

export const request = z.object({
  name: z.string(),
  age: z.number()
})