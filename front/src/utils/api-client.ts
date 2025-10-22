import { createClient } from "@api/client"
export const client = createClient(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000")