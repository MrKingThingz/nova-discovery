import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import { getPostBySlug, getCategories, getRelatedPosts } from "@/lib/supabase";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ArticleAudio } from "@/components/ArticleAudio";
import { publishedNarration } from "@/lib/articleNarration";
import { ArticleImage } from "@/components/ArticleImage";
import { validArticleImage } from "@/lib/articleImage";
import { PostCard } from "@/components/PostCard";
import { formatDate, readTime } from "@/lib/presentation";

export const revalidate = 60;
interface Props {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata({ params }: Props) {
  const post = await getPostBySlug((await params).slug);
  return post
    ? {
        title: post.title,
        description: post.excerpt ?? undefined,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
          title: post.title,
          description: post.excerpt ?? undefined,
          type: "article",
          publishedTime: post.published_at ?? undefined,
          ...(validArticleImage(post.featured_image) ? { images: [{ url: post.featured_image.url, alt: post.featured_image.alt }] } : {}),
        },
      }
    : { title: "Article Not Found" };
}
export default async function ArticlePage({ params }: Props) {
  const [post, categories] = await Promise.all([
    getPostBySlug((await params).slug),
    getCategories(),
  ]);
  if (!post) notFound();
  const narration = publishedNarration(post);
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));
  const category = post.category_id ? categoryMap[post.category_id] : null;
  const related = await getRelatedPosts(post.id, post.category_id, 3);
  const sources = (post.source_urls ?? []).filter((url) => {
    try {
      return ["https:", "http:"].includes(new URL(url).protocol);
    } catch {
      return false;
    }
  });
  const videos = (post.youtube_embed_ids ?? [])
    .filter((id) => /^[a-zA-Z0-9_-]{11}$/.test(id))
    .slice(0, 2);
  const date = formatDate(post.published_at),
    reading = readTime(post.word_count);
  return (
    <div className="article-page">
      <div className="reading-container">
        <Link href="/blog" className="text-link back-link">
          <ArrowLeft size={16} />
          Back to the journal
        </Link>
        <header className="article-header">
          {category && (
            <Link href={`/categories/${category.slug}`} className="topic-label">
              {category.name} <ArrowUpRight size={14} />
            </Link>
          )}
          <h1>{post.title}</h1>
          {post.excerpt && <p className="article-deck">{post.excerpt}</p>}
          <div className="article-byline">
            <span className="byline-symbol">
              <BookOpen size={19} />
            </span>
            <div>
              <strong>NOVA Discovery</strong>
              <span>Written with NOVA AI · Human reviewed</span>
            </div>
            <div className="article-date">
              {date && <time dateTime={post.published_at!}>{date}</time>}
              {reading && <span>{reading}</span>}
            </div>
          </div>
        </header>
        {narration && <ArticleAudio key={narration.path} slug={post.slug} title={post.title} duration={narration.duration} />}
        <ArticleImage image={post.featured_image} />
        <article>
          <MarkdownRenderer content={post.content} />
        </article>
        {(post.tags ?? []).length > 0 && (
          <div className="article-tags">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
        {sources.length > 0 && (
          <section className="article-sources">
            <p className="eyebrow">KEEP YOUR CURIOSITY GOING</p>
            <h2>Explore the sources.</h2>
            <ul>
              {sources.map((url, i) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <span className="source-number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      {new URL(url).hostname.replace(/^www\./, "")}
                      <small>{url}</small>
                    </span>
                    <ArrowUpRight size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        {videos.length > 0 && (
          <section className="article-videos">
            <h2>A different perspective.</h2>
            {videos.map((id) => (
              <div className="video-frame" key={id}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${id}`}
                  title={`Related video ${videos.indexOf(id) + 1}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </section>
        )}
      </div>
      {related.length > 0 && (
        <section className="site-container section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THERE’S ALWAYS MORE</p>
              <h2>Stay curious.</h2>
            </div>
            <Link href="/blog" className="text-link">
              All articles <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="post-grid">
            {related.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                category={p.category_id ? categoryMap[p.category_id] : null}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
