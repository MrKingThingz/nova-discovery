import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getCategoryBySlug, getArticlePage } from "@/lib/supabase";
import { pageNumber } from "@/lib/articleSearch";
import { PostCard } from "@/components/PostCard";

export const revalidate = 60;
interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}
export async function generateMetadata({ params }: Props) {
  const category = await getCategoryBySlug((await params).slug);
  return {
    title: category?.name ?? "Topic Not Found",
    description:
      category?.description ?? "Explore astronomy articles by topic.",
  };
}
export default async function CategoryPage({ params, searchParams }: Props) {
  const category = await getCategoryBySlug((await params).slug);
  if (!category) notFound();
  const page = pageNumber((await searchParams).page);
  const { posts, total, pages, unavailable, outOfRange } = await getArticlePage(
    { categoryId: category.id, page },
  );
  if (outOfRange && page > 1) redirect(`/categories/${category.slug}`);
  return (
    <div className="site-container page-content">
      <Link className="text-link back-link" href="/categories">
        <ArrowLeft size={16} />
        All topics
      </Link>
      <header className="page-heading">
        <p className="eyebrow">A CORNER OF THE COSMOS</p>
        <h1>{category.name}</h1>
        <p>
          {category.description ||
            "Explore the ideas and discoveries that make this part of our universe so fascinating."}
        </p>
      </header>
      <div className="results-heading">
        <p>
          {unavailable
            ? "Articles unavailable"
            : `${total} article${total === 1 ? "" : "s"} to explore`}
        </p>
      </div>
      {posts.length > 0 ? (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} category={category} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>
            {unavailable
              ? "We couldn’t load these articles."
              : "A new story starts here."}
          </h2>
          <p>
            {unavailable
              ? "Please try again shortly."
              : "Articles in this topic are on their way."}
          </p>
          <Link className="button button-secondary" href="/blog">
            Browse all articles
          </Link>
        </div>
      )}
      {pages > 1 && (
        <nav className="pagination" aria-label="Article pages">
          {page > 1 ? (
            <Link
              className="button button-secondary"
              href={`?page=${page - 1}`}
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
              href={`?page=${page + 1}`}
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
