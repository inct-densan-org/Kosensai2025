import { NewsList } from "@api/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";

export function NewsTable({data}:{data:NewsList}){
  const router = useRouter()
  const handleClick = ()=>{
    router.push(`/news/${data.id}`)
  }
  return(
    <button onClick={handleClick} className="block min-w-3xl p-1 mx-auto hover:cursor-pointer">
      <Card>
        <CardContent>
          <CardHeader>
              <div className="flex items-end">
                <div className="rounded bg-gray-300 p-1 font-semibold w-[18ch] mr-6">{data.tag}</div>
                <div className="">{data.createdAt.slice(0,10)}</div>
              </div>
              <CardTitle className="text-3xl text-left">{data.title}</CardTitle>
          </CardHeader>
        </CardContent>
      </Card>
    </button>
  )
}