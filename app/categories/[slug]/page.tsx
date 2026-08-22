import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getPostsByCategory, getCategories } from "@/lib/supabase";
import { PostCard } from "@/components/PostCard";
import type { Category } from "@/lib/supabase";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description ?? `Astronomy articles about ${category.name}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [category, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);

  if (!category) notFound();

  const posts = await getPostsByCategory(category.id, 50);
  const categoryMap = Object.fromEntries(categories.map((c: Category) => [c.id, c]));

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="site-container">
        {/* Back */}
        <Link href="/categories" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-300 transition-colors mb-8">
          ← All Topics
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
          <h1 className="text-4xl font-bold text-white">{category.name}</h1>
        </div>
        {category.description && (
          <p className="text-gray-400 mb-2">{category.description}</p>
        )}
        <p className="text-sm mb-12" style={{ color: category.color }}>
          {posts.length} article{posts.length !== 1 ? "s" : ""}
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600">No articles in this category yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                category={categoryMap[post.category_id ?? ""] ?? null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
