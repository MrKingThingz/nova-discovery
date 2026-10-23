import Image, { type StaticImageData } from "next/image";
import { TopicArt } from "@/components/TopicArt";
import mars from "@/public/images/categories/mars-beyond.webp";
import blackHoles from "@/public/images/categories/black-holes.webp";
import spaceTime from "@/public/images/categories/space-time.webp";
import missions from "@/public/images/categories/missions.webp";
import discoveries from "@/public/images/categories/discoveries.webp";
import solarSystem from "@/public/images/categories/solar-system.webp";
import deepUniverse from "@/public/images/categories/deep-universe.webp";
import humanSpaceflight from "@/public/images/categories/human-spaceflight.webp";

// Decorative AI illustrations; category titles provide the link's accessible name.
const artwork: Record<string, StaticImageData> = {
  "mars-beyond": mars,
  "black-holes": blackHoles,
  "space-time": spaceTime,
  missions,
  discoveries,
  "solar-system": solarSystem,
  "deep-universe": deepUniverse,
  "human-spaceflight": humanSpaceflight,
};

export function CategoryImage({ slug, small = false }: { slug: string; small?: boolean }) {
  const image = artwork[slug];
  if (!image) return <TopicArt slug={slug} small={small} />;

  return (
    <div className={`topic-art${small ? " art-small" : ""}`} aria-hidden="true">
      <Image
        src={image}
        alt=""
        fill
        placeholder="blur"
        sizes={small
          ? "(max-width: 700px) 50vw, (max-width: 1050px) 50vw, 280px"
          : "(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 400px"}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
