import { hc } from "hono/client"
import { AppType } from "@api/index"
export const client = hc<AppType>("http://localhost:8000")