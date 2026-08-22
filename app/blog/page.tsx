import React from "react";
import { getPublishedPosts, getCategories } from "@/lib/supabase";
import { PostCard } from "@/components/PostCard";
import type { Category } from "@/lib/supabase";

export const revalidate = 60;

export const metadata = {
  title: "All Articles",
  description: "Every article published on NOVA Discovery — black holes, Mars, relativity, missions, and more.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(50),
    getCategories(),
  ]);

  const categoryMap = Object.fromEntries(categories.map((c: Category) => [c.id, c]));

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">All Articles</h1>
          <p className="text-gray-400">
            {posts.length} article{posts.length !== 1 ? "s" : ""} exploring the universe
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-600">No articles published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                category={post.category_id ? categoryMap[post.category_id] : null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
