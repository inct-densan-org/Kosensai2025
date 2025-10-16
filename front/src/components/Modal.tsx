import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { cn } from "@/lib/utils"

export function Modal({
  children,
  button,
  defaultOpen=false,
  className=""
}:{
  children:React.ReactNode
  button:React.ReactNode,
  defaultOpen?:boolean,
  className?:string
}){
  return(
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger asChild>
        <button>
          {button}
        </button>
      </DialogTrigger>
      <DialogContent className={cn("px-10",className)}>
        <DialogTitle></DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  )
}