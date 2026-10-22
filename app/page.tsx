import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ScanLine,
  Orbit,
} from "lucide-react";
import { getPublishedPosts, getCategories } from "@/lib/supabase";
import { PostCard } from "@/components/PostCard";
import { InstallApp } from "@/components/InstallApp";
import { BrandMark } from "@/components/BrandMark";
import { TopicArt } from "@/components/TopicArt";

export const revalidate = 60;
export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(5),
    getCategories(),
  ]);
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));
  return (
    <>
      <section className="hero">
        <Image
          src="/hero-milkyway.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="site-container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              FOR THE ENDLESSLY CURIOUS
            </p>
            <h1>
              There’s a whole
              <br />
              universe <em>out there.</em>
            </h1>
            <p className="hero-description">
              Get a little closer. Explore the discoveries, big questions, and
              extraordinary science beyond our everyday world.
            </p>
            <div className="button-row">
              <Link href="/blog" className="button button-primary">
                Start exploring <ArrowRight size={18} />
              </Link>
              <Link href="/categories" className="button button-glass">
                Find your curiosity
              </Link>
            </div>
          </div>
          <div className="hero-coordinate" aria-hidden="true">
            <span className="coordinate-cross">+</span>
            <span>
              OUR HOME GALAXY
              <br />
              <strong>The Milky Way</strong>
            </span>
          </div>
          <div className="hero-bottom">
            <span>SCIENCE. CURIOSITY. WONDER.</span>
            <a href="#latest" className="text-link">
              Discover what’s below <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>
      <div className="principles">
        <div className="site-container principles-inner">
          <span>
            <Sparkles size={17} />
            Big ideas, made approachable
          </span>
          <span>
            <ScanLine size={17} />
            Sources you can explore
          </span>
          <span>
            <Orbit size={17} />
            Always more to discover
          </span>
        </div>
      </div>
      <section className="site-container section" id="latest">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE DISCOVERY JOURNAL</p>
            <h2>A fresh perspective.</h2>
          </div>
          <Link className="text-link" href="/blog">
            All articles <ArrowUpRight size={18} />
          </Link>
        </div>
        {posts.length ? (
          <div className="home-post-grid">
            {posts.map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                category={
                  post.category_id ? categoryMap[post.category_id] : null
                }
                featured={i === 0}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Orbit size={36} />
            <h3>The next discovery is on its way.</h3>
            <p>
              New articles will appear here once they’ve been reviewed and
              published.
            </p>
            <Link href="/categories" className="button button-secondary">
              Explore our topics <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>
      {categories.length > 0 && (
        <section className="topic-section">
          <div className="site-container section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">FOLLOW YOUR CURIOSITY</p>
                <h2>Pick a corner of the cosmos.</h2>
              </div>
              <Link href="/categories" className="text-link">
                All topics <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="topic-grid">
              {categories.slice(0, 4).map((cat, i) => (
                <Link
                  href={`/categories/${cat.slug}`}
                  className="topic-tile"
                  key={cat.id}
                >
                  <TopicArt slug={cat.slug} small />
                  <div>
                    <span className="topic-number">0{i + 1}</span>
                    <h3>{cat.name}</h3>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="site-container section">
        <div className="app-banner">
          <div className="app-banner-art" aria-hidden="true">
            <div className="app-orbit" />
            <BrandMark />
          </div>
          <div className="app-banner-copy">
            <p className="eyebrow">TAKE YOUR CURIOSITY WITH YOU</p>
            <h2>The universe, in your pocket.</h2>
            <p>
              Add Discovery to your Home Screen. Your next read is always a tap
              away.
            </p>
          </div>
          <InstallApp />
        </div>
      </section>
    </>
  );
}
