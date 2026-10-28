import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laura Anthony — A little space for thoughtful technology",
  description:
    "Hi, I’m Laura. I’m an engineer and builder exploring private AI, native applications, and technology that works for people. Come in and explore my work.",
  openGraph: {
    title: "Laura Anthony — Engineer, builder, curious human",
    description:
      "Applied AI, Apple platforms, and human-centered technology. A little space to explore what I’m building.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f1e8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
