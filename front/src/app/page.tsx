"use client"
import { Modal } from "@/components/Modal";
import { MapPinHouseIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="p-10">
      {/* ボタンはコンポーネントに埋めてあるので、こちらからは中身のみ渡す */}
      <Modal button={<MapPinHouseIcon/>}>
        <li>hoge</li>
        <li>huga</li>
        <li>poo</li>
      </Modal>
    </div>
  );
}
