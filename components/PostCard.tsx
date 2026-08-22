import React from "react";
import Link from "next/link";
import type { Post, Category } from "@/lib/supabase";

interface PostCardProps {
  post: Post;
  category?: Category | null;
  featured?: boolean;
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readTime(wordCount: number | null): string {
  if (!wordCount) return "";
  const mins = Math.max(1, Math.round(wordCount / 200));
  return `${mins} min read`;
}

export function PostCard({ post, category, featured = false }: PostCardProps) {
  const categoryColor = category?.color ?? "#a78bfa";

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-950/40 to-indigo-950/40 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20 p-8 md:p-12">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

          {/* Category */}
          {category && (
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-4 border"
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
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4 group-hover:text-purple-100 transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>{formatDate(post.published_at)}</span>
            {post.word_count && <span>·</span>}
            <span>{readTime(post.word_count)}</span>
          </div>

          {/* Read more */}
          <div className="mt-6">
            <span className="inline-flex items-center gap-1.5 text-sm text-purple-400 group-hover:text-purple-300 transition-colors font-medium">
              Read article →
            </span>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="h-full rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-200 p-6 flex flex-col">
        {/* Category */}
        {category && (
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-3 border self-start"
            style={{
              color: categoryColor,
              borderColor: `${categoryColor}30`,
              background: `${categoryColor}10`,
            }}
          >
            {category.name}
          </span>
        )}

        {/* Title */}
        <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-purple-100 transition-colors flex-1">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-[11px] text-gray-700 mt-auto pt-3 border-t border-white/5">
          <span>{formatDate(post.published_at)}</span>
          <span>{readTime(post.word_count)}</span>
        </div>
      </article>
    </Link>
  );
}
