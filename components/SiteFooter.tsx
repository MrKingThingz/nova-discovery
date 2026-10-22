import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand">
              <BrandMark />
              <span>
                <strong>
                  NOVA<span className="brand-dot">.</span>
                </strong>
                <small>DISCOVERY</small>
              </span>
            </Link>
            <p>
              For the endlessly curious.
              <br />A closer look at the universe we call home.
            </p>
          </div>
          <div className="footer-links">
            <span className="eyebrow">KEEP EXPLORING</span>
            <Link href="/blog">
              All articles <ArrowUpRight size={15} />
            </Link>
            <Link href="/categories">
              Explore topics <ArrowUpRight size={15} />
            </Link>
            <Link href="/about">
              Our story <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="footer-note">
            <span className="eyebrow">CURIOSITY, WITH CONTEXT</span>
            <p>
              Researched and written with NOVA AI.
              <br />
              Reviewed by a human before publication.
            </p>
            <Link className="text-link" href="/about#our-process">
              How we create our articles <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NOVA Discovery</span>
          <span>Science. Curiosity. Wonder.</span>
        </div>
      </div>
    </footer>
  );
}
