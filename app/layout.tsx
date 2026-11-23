import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/jost/wght.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laura Anthony · AI Product and Engineering Leader",
  description:
    "Laura Anthony leads teams, sets product direction, and builds AI technology herself. Ten years across education and enterprise, most recently at Apple.",
  openGraph: {
    title: "Laura Anthony · AI Product and Engineering Leader",
    description:
      "Leading teams, shaping products, and building private AI. Apple, The Westminster Schools, LaunchFrame.",
    type: "website",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
