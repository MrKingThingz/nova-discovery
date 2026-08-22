// Reads published astronomy content from the shared Supabase database.
// Uses the public anon key — only reads publicly published posts.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Types ──────────────────────────────────────────────────────

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  status: string;
  category_id: string | null;
  tags: string[];
  word_count: number | null;
  source_urls: string[];
  youtube_embed_ids: string[];
  published_at: string | null;
  created_at: string;
  featured_image_query: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
}

// ── Data fetchers ──────────────────────────────────────────────

export async function getPublishedPosts(limit = 20): Promise<Post[]> {
  const { data, error } = await supabase
    .from("astronomy_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) { console.error("getPublishedPosts:", error.message); return []; }
  return (data ?? []) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("astronomy_posts")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Post;
}

export async function getPostsByCategory(categoryId: string, limit = 12): Promise<Post[]> {
  const { data, error } = await supabase
    .from("astronomy_posts")
    .select("*")
    .eq("status", "published")
    .eq("category_id", categoryId)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data ?? []) as Post[];
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("astronomy_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data ?? []) as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("astronomy_categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Category;
}

export async function getRelatedPosts(postId: string, categoryId: string | null, limit = 3): Promise<Post[]> {
  let query = supabase
    .from("astronomy_posts")
    .select("id, title, slug, excerpt, published_at, category_id, tags")
    .eq("status", "published")
    .neq("id", postId)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (categoryId) query = query.eq("category_id", categoryId);

  const { data } = await query;
  return (data ?? []) as Post[];
}
