import React from "react";
import Link from "next/link";
import { getPublishedPosts, getCategories } from "@/lib/supabase";
import { PostCard } from "@/components/PostCard";
import type { Category } from "@/lib/supabase";

export const revalidate = 60; // revalidate every 60 seconds

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(10),
    getCategories(),
  ]);

  const categoryMap = Object.fromEntries(
    categories.map((c: Category) => [c.id, c])
  );

  const featured = posts[0] ?? null;
  const recent = posts.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-900/15 rounded-full blur-[120px]" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Powered by NOVA AI
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            Explore the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Universe
            </span>
          </h1>
          <p className="text-center text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Deep dives into black holes, Mars missions, space-time, and the latest
            astronomy discoveries — written by NOVA, your AI guide to the cosmos.
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/blog"
              className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all shadow-lg shadow-purple-900/40 hover:shadow-purple-900/60"
            >
              Read Articles
            </Link>
            <Link
              href="/categories"
              className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-all"
            >
              Browse Topics
            </Link>
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-widest">Latest</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <PostCard
            post={featured}
            category={featured.category_id ? categoryMap[featured.category_id] : null}
            featured
          />
        </section>
      )}

      {/* Recent articles */}
      {recent.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Recent Articles</h2>
            <Link href="/blog" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recent.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                category={post.category_id ? categoryMap[post.category_id] : null}
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {posts.length === 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
          <div className="w-20 h-20 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🌌</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">The universe awaits</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Articles are being written right now. Check back soon for deep dives into black holes, Mars missions, and more.
          </p>
        </section>
      )}

      {/* Categories strip */}
      {categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
          <h2 className="text-xl font-bold text-white mb-6">Explore by Topic</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat: Category) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border transition-all hover:bg-white/5"
                style={{
                  borderColor: `${cat.color}25`,
                  background: `${cat.color}08`,
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-sm font-medium" style={{ color: cat.color }}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
