"use client"
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { client } from "@/utils/api-client";

export default function HtmlDisplayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)

  const [rawHtml, setRawHtml] = useState("");
  const [safeHtml, setSafeHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(id)
    if (!id) return; // idが無ければ何もしない

    let mounted = true;
    const fetchHtml = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("call request")
        const res = await client.news[":id"].$get({
          param:{
            id
          }
        })
        console.log("req fin")
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { data } = await res.json();
        const html = data.body
        if (!mounted) return;
        setRawHtml(html);

        const cleaned = DOMPurify.sanitize(html, { ADD_ATTR: ["target"] });
        setSafeHtml(cleaned);
      } catch (e:any) {
        if (!mounted) return
        setError(e.message||"Error")
        setRawHtml("");
        setSafeHtml("");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchHtml();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <main className="p-4 max-w-4xl mx-auto">

      {loading && <p>読み込み中…</p>}
      {error && <div className="p-3 bg-red-50 text-red-700 rounded">エラー: {error}</div>}

      <article
        className="prose max-w-none mt-4"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
        aria-live="polite"
      />
    </main>
  );
}
