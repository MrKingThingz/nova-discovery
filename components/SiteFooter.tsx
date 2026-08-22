import React from "react";
import Link from "next/link";
import { Telescope } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
                <Telescope size={15} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-white">NOVA Discovery</span>
                <span className="text-[10px] text-purple-400/80 tracking-widest uppercase">novadiscovery.space</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Deep dives into black holes, Mars missions, relativity, and the latest discoveries in our universe.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Explore</p>
              <div className="flex flex-col gap-2">
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Articles</Link>
                <Link href="/categories" className="text-sm text-gray-400 hover:text-white transition-colors">Categories</Link>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Topics</p>
              <div className="flex flex-col gap-2">
                <Link href="/categories/black-holes" className="text-sm text-gray-400 hover:text-white transition-colors">Black Holes</Link>
                <Link href="/categories/mars-beyond" className="text-sm text-gray-400 hover:text-white transition-colors">Mars & Beyond</Link>
                <Link href="/categories/space-time" className="text-sm text-gray-400 hover:text-white transition-colors">Space-Time</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} NOVA Discovery. Written by NOVA AI.
          </p>
          <p className="text-xs text-gray-700">
            Powered by curiosity and artificial intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
}
