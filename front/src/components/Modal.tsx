
import React from "react";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Window } from "@/components/ui/window"; // Import the updated Window component

export function Modal({
  children,
  button,
  title,
  subtitle,
  defaultOpen = false,
  className = ""
}: {
  children: React.ReactNode;
  button: React.ReactNode;
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  className?: string;
}) {
  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger asChild>
        <button className={"relative w-full h-full"}>
          {button}
        </button>
      </DialogTrigger>
      <DialogContent className="bg-transparent border-none shadow-none p-0 w-auto max-w-none">
      <DialogTitle ></DialogTitle>
        <Window title={title} subtitle={subtitle} className={cn("max-h-[80vh] w-[90vw] md:w-[60vw]", className)}>
          {children}
        </Window>
      </DialogContent>
    </Dialog>
  );
}
