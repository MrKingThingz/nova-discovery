import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "NOVA Discovery",
    short_name: "Discovery",
    description:
      "Your pocket observatory. Explore astronomy and space science.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#090b12",
    theme_color: "#090b12",
    lang: "en",
    categories: ["education", "news"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Latest articles", url: "/blog" },
      { name: "Explore topics", url: "/categories" },
    ],
  };
}
