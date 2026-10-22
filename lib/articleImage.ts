export interface ArticleImage {
  url: string;
  kind: "source" | "generated";
  alt: string;
  caption: string;
  credit: string;
  sourceUrl: string | null;
}
export function validArticleImage(image?: ArticleImage | null): image is ArticleImage {
  if (!image || typeof image.url !== "string") return false;
  try {
    const url = new URL(image.url);
    const storage = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);
    return url.origin === storage.origin && url.pathname.startsWith("/storage/v1/object/public/astronomy-images/")
      && ["source", "generated"].includes(image.kind) && typeof image.alt === "string";
  } catch { return false; }
}
