import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "NOVA Discovery — Explore the Universe",
    template: "%s | NOVA Discovery",
  },
  description:
    "Deep dives into black holes, Mars missions, space-time, and the latest astronomy discoveries. Written by NOVA, your guide to the universe.",
  metadataBase: new URL("https://novadiscovery.space"),
  openGraph: {
    siteName: "NOVA Discovery",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.variable} antialiased`}>
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
