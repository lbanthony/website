import type { ImageLoaderProps } from "next/image";

// The Pages build generates these responsive images locally at quality 75.
export default function imageLoader({ src, width }: ImageLoaderProps) {
  const name = src.slice(src.lastIndexOf("/") + 1).replace(/\.[^.]+$/, "");
  return `/images/generated/${name}-${width}.webp`;
}
