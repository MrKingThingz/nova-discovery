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
    year: "numeric", month: "long", day: "numeric",
  });
}

function readTime(wordCount: number | null): string {
  if (!wordCount) return "";
  const mins = Math.max(1, Math.round(wordCount / 200));
  return `${mins} min read`;
}

export function PostCard({ post, category, featured = false }: PostCardProps) {
  const categoryColor = category?.color ?? "#8b5cf6";

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article
          className="relative rounded-3xl overflow-hidden border border-white/[0.08] hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20"
          style={{ background: "linear-gradient(135deg, rgba(88,28,220,0.08) 0%, rgba(16,12,40,0.8) 50%, rgba(6,6,15,0.9) 100%)" }}
        >
          {/* Subtle glow top-right */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-40"
            style={{ background: `radial-gradient(circle, ${categoryColor}20 0%, transparent 70%)` }}
          />

          <div className="relative p-8 md:p-12">
            {/* Category badge */}
            {category && (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] mb-6 border"
                style={{ color: categoryColor, borderColor: `${categoryColor}35`, background: `${categoryColor}12` }}
              >
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: categoryColor }} />
                {category.name}
              </span>
            )}

            {/* Title */}
            <h2
              className="text-2xl md:text-4xl font-black text-white leading-tight mb-5 tracking-tight group-hover:text-purple-50 transition-colors"
              style={{ letterSpacing: "-0.02em" }}
            >
              {post.title}
            </h2>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-3xl line-clamp-3">
                {post.excerpt}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span className="text-purple-400/60 font-medium">NOVA AI</span>
                {post.published_at && <><span>·</span><span>{formatDate(post.published_at)}</span></>}
                {post.word_count && <><span>·</span><span>{readTime(post.word_count)}</span></>}
              </div>
              <span className="text-sm text-purple-400 group-hover:text-purple-300 transition-colors font-semibold flex items-center gap-1.5">
                Read <span className="text-base group-hover:translate-x-0.5 transition-transform inline-block">→</span>
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Regular card
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article
        className="h-full rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 p-6 flex flex-col"
        style={{ background: "rgba(6,6,15,0.8)", backdropFilter: "blur(10px)" }}
      >
        {/* Category */}
        {category && (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] mb-4 border self-start"
            style={{ color: categoryColor, borderColor: `${categoryColor}30`, background: `${categoryColor}10` }}
          >
            {category.name}
          </span>
        )}

        {/* Title */}
        <h3
          className="text-base font-bold text-white leading-snug mb-3 group-hover:text-purple-100 transition-colors flex-1"
          style={{ letterSpacing: "-0.01em" }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Meta footer */}
        <div className="flex items-center justify-between text-[11px] text-gray-700 mt-auto pt-3 border-t border-white/5">
          <span>{formatDate(post.published_at)}</span>
          <span>{readTime(post.word_count)}</span>
        </div>
      </article>
    </Link>
  );
}
