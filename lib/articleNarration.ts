import { createHash } from "node:crypto";

export function publishedNarration(post: { id: string; status: string; title: string; content: string; narration?: unknown }) {
  const n = post.narration as { version?: number; sourceHash?: string; approved?: boolean; path?: string; duration?: number; totalParts?: number; parts?: unknown[] } | null;
  if (post.status !== "published" || n?.version !== 1 || !n.approved || typeof n.path !== "string" || !Number.isFinite(n.duration) || n.duration! <= 0 || !Array.isArray(n.parts) || n.parts.length !== n.totalParts || !n.parts.length) return null;
  if (!/^[a-f0-9-]{36}\/[a-f0-9-]{36}\/[a-f0-9-]{36}\.wav$/i.test(n.path) || n.path.split("/")[1] !== post.id) return null;
  if (n.sourceHash !== createHash("sha256").update(JSON.stringify([post.title, post.content])).digest("hex")) return null;
  return { path: n.path, duration: n.duration! };
}
