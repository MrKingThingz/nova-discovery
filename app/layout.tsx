import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "NOVA Discovery — For the Endlessly Curious",
    template: "%s | NOVA Discovery",
  },
  description:
    "Explore astronomy, space science, and the discoveries changing how we see the universe. Articles researched with NOVA AI and reviewed by a human.",
  applicationName: "NOVA Discovery",
  metadataBase: new URL("https://novadiscovery.space"),
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Discovery",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/icons/discovery.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    siteName: "NOVA Discovery",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/hero-milkyway.jpg",
        width: 3840,
        height: 2160,
        alt: "The Milky Way — NOVA Discovery",
      },
    ],
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#090b12",
  colorScheme: "dark",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <SiteNav />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
