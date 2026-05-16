/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
