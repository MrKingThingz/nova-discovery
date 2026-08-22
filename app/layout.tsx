import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "NOVA Discovery — Journey Through the Universe",
    template: "%s | NOVA Discovery",
  },
  description:
    "Deep dives into black holes, Mars missions, space-time, and the latest astronomy discoveries. Your AI-powered guide to the cosmos.",
  metadataBase: new URL("https://novadiscovery.space"),
  openGraph: {
    siteName: "NOVA Discovery",
    type: "website",
    locale: "en_US",
  },
  themeColor: "#000005",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
