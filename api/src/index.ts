import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator'
//↑モジュールたち
//↓型定義ファイル
import { request } from './schema.js'

const app = new Hono()
  .use(cors({
    origin: ["http://localhost:3000"]
  }))
  .get('/', (c) => {
    return c.json({ message: "hono API is running"})
  })
  .post("/post",zValidator("json",request), (c)=>{
    const data = c.req.valid("json")
    return c.json({ message: `${data.name} is ${data.age} years old`})
  })

export type AppType = typeof app  
serve({
  fetch: app.fetch,
  port: 8000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
