import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { getCategories } from "@/lib/supabase";
import { CategoryImage } from "@/components/CategoryImage";

export const revalidate = 60;
export const metadata = {
  title: "Explore Topics",
  description:
    "From our nearest neighbors to the farthest reaches of space. Find your next astronomy read.",
};
export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="site-container page-content">
      <header className="page-heading">
        <p className="eyebrow">FOLLOW YOUR CURIOSITY</p>
        <h1>Where will you go next?</h1>
        <p>
          From our nearest neighbors to the farthest reaches of space. There’s
          always another question to explore.
        </p>
      </header>
      <div className="category-grid">
        {categories.map((cat, i) => (
          <Link
            className="category-card"
            href={`/categories/${cat.slug}`}
            key={cat.id}
          >
            <CategoryImage slug={cat.slug} />
            <div className="category-card-copy">
              <span className="topic-number">
                {String(i + 1).padStart(2, "0")} / EXPLORE
              </span>
              <h2>{cat.name}</h2>
              <p>
                {cat.description ||
                  `Discover the science, stories, and questions behind ${cat.name.toLowerCase()}.`}
              </p>
              <span className="text-link">
                Explore topic <ArrowUpRight size={17} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      {!categories.length && (
        <div className="empty-state">
          <Compass size={32} />
          <h2>More to explore soon.</h2>
          <p>Our topics will appear here as the journal grows.</p>
          <Link href="/blog" className="button button-secondary">
            Browse the journal
          </Link>
        </div>
      )}
    </div>
  );
}
