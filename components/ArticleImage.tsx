"use client";
import Image from "next/image";
import { useState } from "react";
import { TopicArt } from "@/components/TopicArt";
import { validArticleImage, type ArticleImage as ArticleImageData } from "@/lib/articleImage";

export function ArticleImage({ image, topic, card = false }: { image?: ArticleImageData | null; topic?: string; card?: boolean }) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  if (!validArticleImage(image) || failedUrl === image.url) return card ? <TopicArt slug={topic} /> : null;
  const picture = <Image src={image.url} alt={image.alt} fill sizes={card ? "(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 400px" : "(max-width: 800px) 100vw, 780px"} onError={() => setFailedUrl(image.url)} style={{ objectFit: "cover" }} />;
  if (card) return <div className="topic-art article-picture">{picture}{image.kind === "generated" && <span className="image-kind">AI illustration</span>}</div>;
  const source = image.sourceUrl?.startsWith("https://images.nasa.gov/") ? image.sourceUrl : null;
  return <figure className="article-image">
    <div className="article-image-frame">{picture}</div>
    <figcaption>
      <span>{image.caption}</span>
      {source ? <a href={source} target="_blank" rel="noopener noreferrer">{image.credit} · View source ↗</a> : <span>{image.credit}</span>}
    </figcaption>
  </figure>;
}
