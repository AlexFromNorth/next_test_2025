import type { NextConfig } from "next";
const { i18n } = require("./next-i18next.config");

const nextConfig: NextConfig = {
  i18n,
  experimental: {
    turbo: false, // Полностью отключаем Turbopack
  },
};

export default nextConfig;
