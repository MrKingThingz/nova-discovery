import React from "react";
import Link from "next/link";
import { Telescope } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-black mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
                <Telescope size={16} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-white">NOVA Discovery</span>
                <span className="text-[10px] text-purple-400/60 tracking-[0.15em] uppercase">novadiscovery.space</span>
              </div>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              AI-powered deep dives into the universe — black holes, Mars missions, space-time, and the science that bends the mind.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.15em]">Explore</p>
              <div className="flex flex-col gap-2.5">
                {[
                  ["/blog", "Articles"],
                  ["/categories", "Topics"],
                  ["/about", "About"],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.15em]">Topics</p>
              <div className="flex flex-col gap-2.5">
                {[
                  ["/categories/black-holes", "Black Holes"],
                  ["/categories/mars-beyond", "Mars & Beyond"],
                  ["/categories/space-time", "Space-Time"],
                  ["/categories/discoveries", "Discoveries"],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} NOVA Discovery — All articles written by NOVA AI, reviewed by human.
          </p>
          <p className="text-xs text-gray-800">
            novadiscovery.space
          </p>
        </div>
      </div>
    </footer>
  );
}
