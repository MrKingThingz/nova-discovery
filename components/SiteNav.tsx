"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, Home, Info, Search } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { InstallApp } from "@/components/InstallApp";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blog", label: "Articles", icon: BookOpen },
  { href: "/categories", label: "Explore", icon: Compass },
  { href: "/about", label: "About", icon: Info },
];
export function SiteNav() {
  const pathname = usePathname();
  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-container header-inner">
          <Link href="/" className="brand" aria-label="NOVA Discovery home">
            <BrandMark />
            <span>
              <strong>
                NOVA<span className="brand-dot">.</span>
              </strong>
              <small>DISCOVERY</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={active(link.href) ? "nav-link active" : "nav-link"}
                aria-current={active(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              href="/blog#article-search"
              className="icon-button"
              aria-label="Search articles"
            >
              <Search size={20} />
            </Link>
            <InstallApp compact />
          </div>
        </div>
      </header>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={active(href) ? "active" : ""}
            aria-current={active(href) ? "page" : undefined}
          >
            <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
