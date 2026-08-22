import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts, getCategories } from "@/lib/supabase";
import { PostCard } from "@/components/PostCard";
import type { Category } from "@/lib/supabase";

export const revalidate = 60;

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(10),
    getCategories(),
  ]);

  const categoryMap = Object.fromEntries(categories.map((c: Category) => [c.id, c]));
  const featured = posts[0] ?? null;
  const recent = posts.slice(1, 7);

  return (
    <div className="min-h-screen bg-black">

      {/* ═══════════════════════════════════════════════════
          HERO — Full-viewport Milky Way banner
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full h-screen min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden">

        {/* Milky Way background image */}
        <div className="absolute inset-0">
          <Image
            src="/milky-way.jpg"
            alt="Milky Way Galaxy — our home in the cosmos"
            fill
            priority
            className="object-cover object-center"
            style={{ objectPosition: "center 30%" }}
          />
          {/* Multi-layer dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          {/* Bottom fade to seamless black */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-300 text-xs font-medium tracking-[0.15em] uppercase">AI-Powered Astronomy</span>
            </div>
          </div>

          {/* Main headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6"
            style={{ textShadow: "0 0 80px rgba(139,92,246,0.3), 0 4px 30px rgba(0,0,0,0.8)" }}
          >
            Journey Through
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
              the Universe
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
          >
            Deep dives into black holes, Mars missions, relativity, and the latest
            discoveries — written by NOVA, your AI guide to the cosmos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/blog"
              className="px-8 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-2xl shadow-purple-900/50 hover:shadow-purple-900/70 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Articles →
            </Link>
            <Link
              href="/categories"
              className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 text-white font-semibold transition-all"
            >
              Browse Topics
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 text-white/30">
              <span className="text-[10px] tracking-widest uppercase">Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURED ARTICLE
      ═══════════════════════════════════════════════════ */}
      {featured && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            <span className="text-[11px] font-bold text-purple-400/80 uppercase tracking-[0.2em]">Latest Discovery</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>
          <PostCard
            post={featured}
            category={featured.category_id ? categoryMap[featured.category_id] : null}
            featured
          />
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          RECENT ARTICLES GRID
      ═══════════════════════════════════════════════════ */}
      {recent.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Recent Articles</h2>
            <Link href="/blog" className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
              View all <span className="text-lg leading-none">→</span>
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

      {/* ═══════════════════════════════════════════════════
          EMPTY STATE (no articles yet)
      ═══════════════════════════════════════════════════ */}
      {posts.length === 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
          <div className="w-24 h-24 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-8">
            <span className="text-5xl">🌌</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">The Universe Awaits</h2>
          <p className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed">
            Articles are being prepared right now. The first deep dive is coming soon.
          </p>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          CATEGORIES STRIP
      ═══════════════════════════════════════════════════ */}
      {categories.length > 0 && (
        <section className="border-t border-white/5 bg-gradient-to-b from-transparent to-[#06060f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <h2 className="text-xl font-bold text-white mb-6">Explore by Topic</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat: Category) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    borderColor: `${cat.color}25`,
                    background: `${cat.color}08`,
                  }}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm font-medium" style={{ color: cat.color }}>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
