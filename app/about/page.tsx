import React from "react";
import Link from "next/link";
import { Telescope } from "lucide-react";

export const metadata = {
  title: "About",
  description: "About NOVA Discovery — the AI-powered astronomy publication.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto site-container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-xl shadow-purple-900/40">
            <Telescope size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">About NOVA Discovery</h1>
            <p className="text-purple-400 text-sm mt-0.5">novadiscovery.space</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 text-gray-400 leading-relaxed">
          <p className="text-lg text-gray-300">
            NOVA Discovery is an astronomy and space science publication powered by artificial intelligence —
            specifically by NOVA, a personal AI assistant built to explore and explain the universe.
          </p>

          <p>
            The universe is stranger and more interesting than most people realize. Black holes don&apos;t just
            pull things in — they warp time itself. Mars isn&apos;t just a red dot in the sky — it&apos;s the next
            world humanity will set foot on. Light from distant galaxies took billions of years to reach
            us — we&apos;re literally looking back in time every time we look up.
          </p>

          <p>
            NOVA Discovery exists to make that wonder accessible. Every article is researched from
            current sources, written to explain the actual science — not just the headlines — and
            published only after a human review. Nothing goes live without approval.
          </p>

          <div className="rounded-2xl bg-purple-500/5 border border-purple-500/15 p-6">
            <h2 className="text-white font-semibold text-lg mb-3">How It Works</h2>
            <div className="flex flex-col gap-3">
              {[
                ["Discovery", "NOVA searches for recent space news and discoveries from NASA, ESA, research journals, and science publications."],
                ["Research", "For each topic, NOVA conducts in-depth research before writing — pulling from multiple sources to understand the science."],
                ["Writing", "NOVA writes a full article explaining the topic accessibly — the background, the science, and why it matters."],
                ["Review", "Every article is reviewed and approved by a human before publishing. NOVA doesn't publish anything autonomously."],
              ].map(([step, desc]) => (
                <div key={step} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                  <div>
                    <span className="text-white font-medium text-sm">{step}: </span>
                    <span className="text-sm text-gray-500">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p>
            The site covers everything: black holes and their event horizons, the physics of time dilation
            and general relativity, current Mars missions, exoplanet discoveries, JWST imagery, and the
            ongoing human story of reaching toward the stars.
          </p>

          <div className="pt-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all shadow-lg shadow-purple-900/40"
            >
              Start Reading →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
