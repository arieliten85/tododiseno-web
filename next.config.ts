import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio 100% front-end: se exporta a HTML estático (hosting en Cloudflare).
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/images/loader.ts",
  },
};

export default nextConfig;
