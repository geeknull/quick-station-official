import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用静态导出，适合 Zeabur 静态托管
  output: "export",

  // 禁用图片优化（静态导出不支持）
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
