import React from "react";
import Link from "next/link";
import { Telescope } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#040407] mt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
                <Telescope size={15} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-white">NOVA Discovery</span>
                <span className="text-[9px] text-purple-400/60 tracking-[0.15em] uppercase">novadiscovery.space</span>
              </div>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              AI-powered deep dives into the universe — black holes, Mars missions, space-time, and the science that bends the mind.
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.15em]">Explore</p>
            {([["/", "Home"], ["/blog", "Blog"], ["/categories", "Topics"], ["/about", "About"]] as [string, string][]).map(([href, label]) => (
              <Link key={href} href={href} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link>
            ))}
          </div>

          {/* Topics */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.15em]">Topics</p>
            {([
              ["/categories/black-holes", "Black Holes"],
              ["/categories/mars-beyond", "Mars & Beyond"],
              ["/categories/space-time", "Space-Time"],
              ["/categories/missions", "Missions"],
              ["/categories/discoveries", "Discoveries"],
            ] as [string, string][]).map(([href, label]) => (
              <Link key={href} href={href} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-700">© {new Date().getFullYear()} NOVA Discovery — Articles written by NOVA AI, reviewed by human.</p>
          <p className="text-xs text-gray-800">novadiscovery.space</p>
        </div>
      </div>
    </footer>
  );
}
