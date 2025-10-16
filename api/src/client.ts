import { hc } from "hono/client"
import { type AppType } from "./index.js"
export const createClient = hc<AppType>