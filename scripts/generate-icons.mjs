import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { mkdir, writeFile } from "node:fs/promises";
const destination = new URL("../public/icons/", import.meta.url);
await mkdir(destination, { recursive: true });
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><radialGradient id="bg"><stop stop-color="#34264e"/><stop offset="1" stop-color="#141021"/></radialGradient></defs><rect width="512" height="512" fill="url(#bg)"/><ellipse cx="256" cy="256" rx="169" ry="86" transform="rotate(-35 256 256)" fill="none" stroke="#a78bfa" stroke-width="9"/><path d="M256 120L290 222L392 256L290 290L256 392L222 290L120 256L222 222Z" fill="#e5dcff"/><circle cx="381" cy="160" r="20" fill="#bba2ff"/></svg>`;
await writeFile(new URL("discovery.svg", destination), svg);
for (const size of [192, 512])
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(fileURLToPath(new URL(`icon-${size}.png`, destination)));
await sharp(Buffer.from(svg))
  .resize(180, 180)
  .png()
  .toFile(fileURLToPath(new URL("apple-touch-icon.png", destination)));
// Artwork stays within the maskable safe area; the opaque background fills every crop.
await sharp(Buffer.from(svg))
  .resize(512, 512)
  .png()
  .toFile(fileURLToPath(new URL("icon-maskable-512.png", destination)));
console.log("Discovery app icons generated.");
