import type { NextConfig } from "next";
import imageSizes from "./lib/image-sizes.json";

const pagesBuild = process.env.LAURA_PAGES_BUILD === "1";

const config: NextConfig = {
  poweredByHeader: false,
  ...(pagesBuild ? { output: "export" as const } : {}),
  images: {
    ...imageSizes,
    ...(pagesBuild
      ? { loader: "custom" as const, loaderFile: "./lib/image-loader.ts" }
      : {}),
  },
  headers: pagesBuild
    ? undefined
    : async () => [
        {
          source: "/:path*",
          headers: [
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
            {
              key: "Permissions-Policy",
              value: "camera=(), microphone=(), geolocation=()",
            },
          ],
        },
      ],
};

export default config;
