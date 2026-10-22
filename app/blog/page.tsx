import Link from "next/link";
import { redirect } from "next/navigation";
import { Search, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { getArticlePage, getCategories } from "@/lib/supabase";
import { pageNumber, normalizeSearch } from "@/lib/articleSearch";
import { PostCard } from "@/components/PostCard";

export const revalidate = 60;
export const metadata = {
  title: "The Discovery Journal",
  description:
    "Explore our astronomy articles. Search discoveries, missions, and the science of the universe.",
};
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; topic?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? normalizeSearch(params.q) : "";
  const page = pageNumber(params.page);
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === params.topic);
  const { posts, total, pages, unavailable, outOfRange } = await getArticlePage(
    { search: q, categoryId: category?.id, page },
  );
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));
  const url = (topic?: string, nextPage = 1) => {
    const qs = new URLSearchParams();
    if (q) qs.set("q", q);
    if (topic) qs.set("topic", topic);
    if (nextPage > 1) qs.set("page", String(nextPage));
    return `/blog${qs.size ? "?" + qs : ""}`;
  };
  if (outOfRange && page > 1) redirect(url(category?.slug));
  return (
    <div className="site-container page-content">
      <header className="page-heading">
        <p className="eyebrow">THE DISCOVERY JOURNAL</p>
        <h1>A universe of stories.</h1>
        <p>
          Follow a question. Find a new perspective. See where curiosity takes
          you.
        </p>
      </header>
      <form
        action="/blog"
        className="search-form"
        role="search"
        id="article-search"
      >
        <Search size={21} aria-hidden="true" />
        <label className="sr-only" htmlFor="search">
          Search article titles and summaries
        </label>
        <input
          id="search"
          name="q"
          type="search"
          defaultValue={q}
          maxLength={100}
          placeholder="What are you curious about?"
        />
        {category && <input type="hidden" name="topic" value={category.slug} />}
        <button className="button button-primary" type="submit">
          Search
        </button>
      </form>
      <nav className="filter-list" aria-label="Filter articles by topic">
        <Link
          href={url()}
          className={!category ? "filter-chip selected" : "filter-chip"}
          aria-current={!category ? "page" : undefined}
        >
          All topics
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={url(cat.slug)}
            className={
              category?.id === cat.id ? "filter-chip selected" : "filter-chip"
            }
            aria-current={category?.id === cat.id ? "page" : undefined}
          >
            {cat.name}
          </Link>
        ))}
      </nav>
      <div className="results-heading">
        <p>
          {unavailable
            ? "Articles unavailable"
            : `${total} article${total === 1 ? "" : "s"}${q ? ` for “${q}”` : " to explore"}`}
        </p>
        {(q || category) && (
          <Link className="text-link" href="/blog">
            Clear filters
          </Link>
        )}
      </div>
      {posts.length > 0 ? (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              category={post.category_id ? categoryMap[post.category_id] : null}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <BookOpen size={32} />
          <h2>
            {unavailable
              ? "We couldn’t load the journal."
              : q || category
                ? "No discoveries here just yet."
                : "New stories are on their way."}
          </h2>
          <p>
            {unavailable
              ? "Please try again in a moment."
              : q || category
                ? "Try a different search or explore all topics."
                : "Articles will appear here after review and publication."}
          </p>
          <Link href="/blog" className="button button-secondary">
            {unavailable ? "Try again" : "View all articles"}
          </Link>
        </div>
      )}
      {pages > 1 && (
        <nav className="pagination" aria-label="Article pages">
          {page > 1 ? (
            <Link
              className="button button-secondary"
              href={url(category?.slug, page - 1)}
            >
              <ArrowLeft size={16} />
              Previous
            </Link>
          ) : (
            <span />
          )}
          <span>
            Page {page} of {pages}
          </span>
          {page < pages ? (
            <Link
              className="button button-secondary"
              href={url(category?.slug, page + 1)}
            >
              Next
              <ArrowRight size={16} />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
