import React from "react";
import { Telescope, Atom, Globe2, Rocket } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts, getCategories } from "@/lib/supabase";
import { PostCard } from "@/components/PostCard";
import type { Category, Post } from "@/lib/supabase";

export const revalidate = 60;

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(20),
    getCategories(),
  ]);

  const categoryMap = Object.fromEntries(categories.map((c: Category) => [c.id, c]));
  const latestPosts = posts.slice(0, 3);
  const morePosts = posts.slice(3, 9);

  return (
    <div className="min-h-screen bg-[#080810]">

      {/* ══════════════════════════════════════════════════
          HERO — split layout, text left / galaxy right
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[580px] flex items-center overflow-hidden border-b border-white/5">
        {/* Full-bleed galaxy image, right-biased */}
        <div className="absolute inset-0">
          <Image
            src="/hero-milkyway.jpg"
            alt="Milky Way Galaxy"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center center" }}
          />
          {/* Left-to-right gradient: solid dark on left → transparent right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080810]/85 via-[#080810]/40 to-transparent" />
          {/* Top/bottom darkening */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080810]/30 via-transparent to-[#080810]/60" />
        </div>

        {/* Content — left aligned */}
        <div className="relative z-10 site-container py-36 w-full">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-400 text-xs font-semibold tracking-[0.15em] uppercase">
                AI-Powered Astronomy
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4"
              style={{ textShadow: "0 2px 40px rgba(0,0,0,0.8)" }}>
              Understand the Universe.
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Explore the Unknown.
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-purple-300/70 font-semibold text-base mb-2 tracking-wide">
              Science. Curiosity. Wonder.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm">
              Deep dives into black holes, Mars missions, and the science that bends the mind — written by NOVA AI.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/blog"
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all shadow-lg shadow-purple-900/40 hover:shadow-purple-900/60"
              >
                Explore the Blog →
              </Link>
              <Link
                href="/categories"
                className="flex items-center gap-2 px-8 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all"
              >
                Browse Topics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURE STRIP — 4 pillars
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#060608] py-14">
        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10 border border-white/10 rounded-2xl overflow-hidden">
            <FeaturePillar
              icon={<Telescope size={36} strokeWidth={1.5} />}
              title="Beginner Friendly"
              desc="Clear explanations for all levels of learners."
            />
            <FeaturePillar
              icon={<Atom size={36} strokeWidth={1.5} />}
              title="Science Based"
              desc="Trusted sources and proven science."
            />
            <FeaturePillar
              icon={<Globe2 size={36} strokeWidth={1.5} />}
              title="Always Exploring"
              desc="New articles regularly to fuel your curiosity."
            />
            <FeaturePillar
              icon={<Rocket size={36} strokeWidth={1.5} />}
              title="Learn & Discover"
              desc="Topics, guides, and resources to keep you learning."
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MAIN CONTENT — article grid + sidebar
      ══════════════════════════════════════════════════ */}
      <section className="site-container py-20">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Left: Articles ─────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Latest Articles */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">Latest Articles</h2>
              <Link href="/blog" className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium">
                View all articles →
              </Link>
            </div>

            {latestPosts.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-12 text-center">
                <p className="text-4xl mb-4">🌌</p>
                <p className="text-gray-500 text-sm">Articles are being prepared. Check back soon.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 mb-12">
                {latestPosts.map((post, i) => (
                  <ArticleRow
                    key={post.id}
                    post={post}
                    category={post.category_id ? categoryMap[post.category_id] : null}
                    featured={i === 0}
                  />
                ))}
              </div>
            )}

            {/* Explore the Universe */}
            {morePosts.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">Explore the Universe</h2>
                  <Link href="/blog" className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium">
                    View all →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {morePosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      category={post.category_id ? categoryMap[post.category_id] : null}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── Right: Sidebar ─────────────────────────── */}
          <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-8">

            {/* Popular Topics */}
            <div>
              <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-4">Popular Topics</h3>
              <div className="flex flex-col gap-1">
                {categories.slice(0, 6).map((cat: Category) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{cat.name}</span>
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-500 transition-colors text-xs">→</span>
                  </Link>
                ))}
                <Link
                  href="/categories"
                  className="flex items-center gap-1.5 px-3 py-2.5 text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium mt-1"
                >
                  View all topics →
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* About */}
            <div>
              <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-4">About NOVA Discovery</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Our mission is to make astronomy accessible, engaging, and inspiring for everyone — powered by NOVA AI and reviewed by human.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-500/25 bg-purple-500/8 text-purple-400 hover:text-purple-300 hover:border-purple-500/40 text-xs font-semibold transition-all"
              >
                Learn more about us →
              </Link>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* Categories grid */}
            <div>
              <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-4">Browse by Category</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 4).map((cat: Category) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="rounded-xl p-3 border transition-all hover:bg-white/5 text-center"
                    style={{ borderColor: `${cat.color}20`, background: `${cat.color}06` }}
                  >
                    <p className="text-xs font-semibold leading-tight" style={{ color: cat.color }}>{cat.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

// ── ArticleRow — horizontal article card for the main feed ──

function ArticleRow({
  post,
  category,
  featured = false,
}: {
  post: Post;
  category: Category | null;
  featured?: boolean;
}) {
  const categoryColor = category?.color ?? "#8b5cf6";
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";
  const readTime = post.word_count ? `${Math.max(1, Math.round(post.word_count / 200))} min read` : "";

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        className={`rounded-2xl border border-white/[0.07] hover:border-white/[0.14] transition-all duration-200 p-5 ${
          featured ? "bg-gradient-to-r from-purple-950/20 to-transparent" : "bg-white/[0.02]"
        }`}
      >
        {category && (
          <span
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] mb-2.5"
            style={{ color: categoryColor }}
          >
            {category.name}
          </span>
        )}
        <h3 className={`font-bold text-white leading-snug mb-2 group-hover:text-purple-100 transition-colors ${featured ? "text-xl" : "text-base"}`}>
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-3 text-[11px] text-gray-700">
          {date && <span>{date}</span>}
          {readTime && <><span>•</span><span>{readTime}</span></>}
        </div>
      </article>
    </Link>
  );
}

// ── FeaturePillar ─────────────────────────────────────────────

function FeaturePillar({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-5 px-8 py-10">
      <div className="shrink-0 text-purple-400">
        {icon}
      </div>
      <div className="pt-0.5">
        <p className="text-sm font-bold text-white mb-1.5">{title}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
