import type { NextConfig } from "next";

// Використовуємо any, щоб не впиратися у типи experimental полів
const nextConfig: any = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    turbopack: {
      // Вказуємо корінь проєкту для коректної роботи alias `@/*`
      root: __dirname,
    },
  },
};

export default nextConfig;
