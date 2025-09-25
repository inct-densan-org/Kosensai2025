"use client"
import { useEffect, useState } from "react";
import { hc } from "hono/client"
import { AppType } from "@api/index"

export default function Home() {
  const client = hc<AppType>("http://localhost:8000")
  const [data, setData] = useState("")
  const [res, setRes] = useState("")
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  useEffect(()=>{
    (async ()=>{
      const res = await client.index.$get()
      setData( (await res.json()).message )
    })()
  },[])
  return (
    <div className="p-10">
      {data}
      <div>
        <label htmlFor="name">名前</label>
        <input type="text" id="name" onChange={(e)=>setName(e.target.value)} className="border"/>
        <label htmlFor="age">年齢</label>
        <input type="number" id="age" onChange={(e)=>setAge(Number(e.target.value))} className="border"/>
        <button onClick={async ()=>{
          const res = await client.post.$post({ json: { name:name, age:age } })
          setRes((await res.json()).message)
        }} className="mx-4 rounded border hover:cursor-pointer">submit</button>      
      </div>
      {res}
    </div>
  );
}
