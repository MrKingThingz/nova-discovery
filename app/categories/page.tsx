import React from "react";
import Link from "next/link";
import { getCategories, getPublishedPosts } from "@/lib/supabase";
import type { Category, Post } from "@/lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "Categories",
  description: "Browse astronomy articles by topic.",
};

export default async function CategoriesPage() {
  const [categories, posts] = await Promise.all([
    getCategories(),
    getPublishedPosts(200),
  ]);

  const countByCategory = posts.reduce<Record<string, number>>((acc, p: Post) => {
    if (p.category_id) acc[p.category_id] = (acc[p.category_id] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="site-container">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Topics</h1>
          <p className="text-gray-400">Explore the universe by subject</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat: Category) => {
            const count = countByCategory[cat.id] ?? 0;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group rounded-2xl border p-6 transition-all hover:bg-white/[0.03]"
                style={{ borderColor: `${cat.color}20`, background: `${cat.color}06` }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <h2 className="text-base font-bold text-white group-hover:text-purple-100 transition-colors">
                    {cat.name}
                  </h2>
                </div>
                {cat.description && (
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{cat.description}</p>
                )}
                <p className="text-xs font-medium" style={{ color: cat.color }}>
                  {count} article{count !== 1 ? "s" : ""}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
