import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator'
import { CMS_client as client } from './utils.js'
//↑モジュールたち
//↓型定義ファイル
import { request, type NewsData, type NewsList } from './schema.js'
import z from 'zod'

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

  .get('/news',async (c)=>{
      const data = (await client.get({
        endpoint: "list"
      }))["contents"] as NewsData[]
      data.map(i=>({
        id:i.id,
        title:i.title,
        description:i.description,
        createdAt:i.createdAt
      }))
      data as NewsList[]
      return c.json( {data}, 200 )
  })

  .get("news/:id", zValidator( "param", z.object({id:z.string()}) ), async (c)=>{
    const id = c.req.valid("param").id
    const data = await client.get({
      endpoint: 'list',
      contentId: id,
    }) as NewsData
    return c.json( {data}, 200)
  })

export type AppType = typeof app  
serve({
  fetch: app.fetch,
  port: 8000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
