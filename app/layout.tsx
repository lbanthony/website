import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted fonts. next/font preloads them and sizes the fallback fonts to
// match, so the page doesn't jump when the real fonts arrive.
const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-latin-opsz-normal.woff2", style: "normal" },
    { path: "./fonts/fraunces-latin-opsz-italic.woff2", style: "italic" },
  ],
  weight: "100 900",
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
const jost = localFont({
  src: "./fonts/jost-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-jost",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});
const plexMono = localFont({
  src: "./fonts/ibm-plex-mono-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lanthony.app"),
  title: "Laura Anthony · AI Product and Engineering Leader",
  description:
    "Laura Anthony leads teams, shapes product strategy, and builds human-centered technology. Currently at Apple, with over a decade of experience across education and enterprise.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Laura Anthony · AI Product and Engineering Leader",
    description:
      "Leading teams, shaping product strategy, and building human-centered technology.",
    url: "/",
    siteName: "Laura Anthony",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Laura Anthony, AI product and engineering leader.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laura Anthony · AI Product and Engineering Leader",
    description:
      "Leading teams, shaping product strategy, and building human-centered technology.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3eee5",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jost.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
