import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post, Category } from "@/lib/supabase";
import { formatDate, readTime } from "@/lib/presentation";
import { TopicArt } from "@/components/TopicArt";

export function PostCard({
  post,
  category,
  featured = false,
}: {
  post: Post;
  category?: Category | null;
  featured?: boolean;
}) {
  const date = formatDate(post.published_at),
    reading = readTime(post.word_count);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`post-card${featured ? " post-featured" : ""}`}
    >
      <TopicArt slug={category?.slug} />
      <div className="post-card-content">
        <div className="card-overline">
          <span className="topic-label">{category?.name ?? "Discovery"}</span>
          <ArrowUpRight size={19} aria-hidden="true" />
        </div>
        <h3>{post.title}</h3>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="post-meta">
          {date && <time dateTime={post.published_at!}>{date}</time>}
          {date && reading && <span aria-hidden="true">·</span>}
          {reading && <span>{reading}</span>}
        </div>
      </div>
    </Link>
  );
}
