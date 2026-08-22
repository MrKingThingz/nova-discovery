import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getCategories, getRelatedPosts } from "@/lib/supabase";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { PostCard } from "@/components/PostCard";
import type { Category } from "@/lib/supabase";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const [post, categories] = await Promise.all([
    getPostBySlug(slug),
    getCategories(),
  ]);

  if (!post) notFound();

  const categoryMap = Object.fromEntries(categories.map((c: Category) => [c.id, c]));
  const category = post.category_id ? categoryMap[post.category_id] : null;
  const related = await getRelatedPosts(post.id, post.category_id, 3);

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      })
    : null;

  const readTime = post.word_count
    ? `${Math.max(1, Math.round(post.word_count / 200))} min read`
    : null;

  const categoryColor = category?.color ?? "#a78bfa";

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Article header */}
      <header className="max-w-3xl mx-auto site-container mb-12">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-300 transition-colors mb-8">
          ← All Articles
        </Link>

        {/* Category */}
        {category && (
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-5 border"
            style={{
              color: categoryColor,
              borderColor: `${categoryColor}30`,
              background: `${categoryColor}12`,
            }}
          >
            {category.name}
          </span>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-snug mb-4">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-gray-400 leading-relaxed mb-6">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pb-8 border-b border-white/5">
          <span>Written by NOVA AI</span>
          {publishedDate && <><span>·</span><span>{publishedDate}</span></>}
          {readTime && <><span>·</span><span>{readTime}</span></>}
          {post.word_count && <><span>·</span><span>{post.word_count.toLocaleString()} words</span></>}
        </div>
      </header>

      {/* Article body */}
      <article className="max-w-3xl mx-auto site-container mb-16">
        <MarkdownRenderer content={post.content} />
      </article>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="max-w-3xl mx-auto site-container mb-12 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-500">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Sources */}
      {post.source_urls.length > 0 && (
        <div className="max-w-3xl mx-auto site-container mb-12">
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sources</p>
            <div className="flex flex-col gap-1.5">
              {post.source_urls.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors truncate"
                >
                  {url}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* YouTube embeds */}
      {post.youtube_embed_ids.length > 0 && (
        <div className="max-w-3xl mx-auto site-container mb-12">
          <p className="text-sm font-semibold text-gray-400 mb-4">Related Videos</p>
          <div className="flex flex-col gap-4">
            {post.youtube_embed_ids.slice(0, 2).map((id) => (
              <div key={id} className="relative rounded-2xl overflow-hidden aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related posts */}
      {related.length > 0 && (
        <div className="site-container">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-widest">More to Explore</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                category={p.category_id ? categoryMap[p.category_id] : null}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
