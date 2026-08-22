import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-6">🌌</div>
        <h1 className="text-3xl font-bold text-white mb-3">Lost in Space</h1>
        <p className="text-gray-500 mb-8 max-w-sm">
          This page doesn&apos;t exist — or maybe it collapsed into a black hole.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
