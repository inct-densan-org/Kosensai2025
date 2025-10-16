"use client"
import { NewsTable } from "@/components/News"
import { client } from "@/utils/api-client"
import { NewsList } from "@api/schema"
import { useEffect, useState } from "react"

export default function Page(){
  const [data,setData] = useState<NewsList[]|null>(null)
  useEffect(()=>{
    (async ()=>{
      setData((await (await client.news.$get()).json()).data)
    })()
  },[])
  if(!data)return
  return(
    <div className="">
      {data.map((i,idx)=>{
        return <NewsTable data={i} key={idx}/>
      })}
    </div>
  )
}