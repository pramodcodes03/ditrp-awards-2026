import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder photography until real event images land.
      // `search` is deliberately omitted so query strings are allowed —
      // `search: ""` would reject them outright.
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      // picsum 302s to its CDN. Redirect targets are not re-checked against
      // remotePatterns, but listing it keeps direct CDN URLs working too.
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
