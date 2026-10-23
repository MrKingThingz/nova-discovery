import { getPostBySlug, supabase } from "@/lib/supabase";
import { publishedNarration } from "@/lib/articleNarration";

export const dynamic = "force-dynamic";
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = await getPostBySlug((await params).slug);
  const narration = post && publishedNarration(post);
  if (!narration) return Response.json({ error: "Narration is not available for this article." }, { status: 404, headers: { "Cache-Control": "no-store" } });
  // Anonymous RLS grants only this approved, published recording. No AI API key
  // or generation endpoint exists on the public site.
  const { data, error } = await supabase.storage.from("astronomy-audio").createSignedUrl(narration.path, 3600);
  if (error || !data) return Response.json({ error: "Audio could not be loaded. Please try again." }, { status: 503 });
  return Response.json({ url: data.signedUrl, duration: narration.duration }, { headers: { "Cache-Control": "no-store" } });
}
