#!/usr/bin/env node

/**
 * Icon Generator Script
 * 从 SVG 生成 macOS App Icon 和 Web Favicon
 *
 * 使用方法:
 *   pnpm generate-icons
 *   # 或
 *   node scripts/generate-icons.mjs
 *
 * 源文件:
 *   public/icon.svg - 512x512 的 SVG 图标源文件
 *
 * 输出文件:
 *   generated-icons/
 *   ├── AppIcon.icns          - macOS 应用图标 (拖到 Xcode Assets)
 *   └── AppIcon.iconset/      - iconset 源文件
 *
 *   public/ (自动复制)
 *   ├── favicon.ico           - 浏览器标签图标
 *   ├── favicon-16x16.png
 *   ├── favicon-32x32.png
 *   ├── apple-touch-icon.png  - iOS 添加到主屏幕图标
 *   ├── android-chrome-*.png  - Android PWA 图标
 *   └── site.webmanifest      - PWA manifest 文件
 *
 * 修改图标:
 *   1. 编辑 public/icon.svg
 *   2. 运行 pnpm generate-icons
 *   3. 将 generated-icons/AppIcon.icns 复制到 Xcode 项目
 */

import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, "..");

const SOURCE_SVG = join(PROJECT_DIR, "public/icon.svg");
const OUTPUT_DIR = join(PROJECT_DIR, "generated-icons");
const ICONSET_DIR = join(OUTPUT_DIR, "AppIcon.iconset");
const FAVICON_DIR = join(OUTPUT_DIR, "favicon");
const PUBLIC_DIR = join(PROJECT_DIR, "public");

// 清理并创建输出目录
rmSync(OUTPUT_DIR, { recursive: true, force: true });
mkdirSync(ICONSET_DIR, { recursive: true });
mkdirSync(FAVICON_DIR, { recursive: true });

console.log("🎨 Icon Generator");
console.log("==================");
console.log(`源文件: ${SOURCE_SVG}`);
console.log(`输出目录: ${OUTPUT_DIR}`);
console.log("");

// 读取 SVG
const svgContent = readFileSync(SOURCE_SVG, "utf-8");

// SVG 转 PNG
async function svgToPng(size) {
  const resvg = new Resvg(svgContent, {
    fitTo: { mode: "width", value: size },
  });
  const pngData = resvg.render();
  return pngData.asPng();
}

// macOS App Icon 尺寸
const macOSSizes = [
  { size: 16, name: "icon_16x16.png" },
  { size: 32, name: "icon_16x16@2x.png" },
  { size: 32, name: "icon_32x32.png" },
  { size: 64, name: "icon_32x32@2x.png" },
  { size: 128, name: "icon_128x128.png" },
  { size: 256, name: "icon_128x128@2x.png" },
  { size: 256, name: "icon_256x256.png" },
  { size: 512, name: "icon_256x256@2x.png" },
  { size: 512, name: "icon_512x512.png" },
  { size: 1024, name: "icon_512x512@2x.png" },
];

// Web Favicon 尺寸
const faviconSizes = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 48, name: "favicon-48x48.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
  { size: 150, name: "mstile-150x150.png" },
];

async function main() {
  // 生成 macOS App Icons
  console.log("📱 生成 macOS App Icons...");
  for (const { size, name } of macOSSizes) {
    const png = await svgToPng(size);
    writeFileSync(join(ICONSET_DIR, name), png);
    console.log(`  ✓ ${name} (${size}x${size})`);
  }

  // 生成 .icns 文件
  try {
    execSync(`iconutil -c icns "${ICONSET_DIR}" -o "${join(OUTPUT_DIR, "AppIcon.icns")}"`, {
      stdio: "inherit",
    });
    console.log("  ✓ AppIcon.icns");
  } catch {
    console.log("  ⚠️ iconutil 失败，请手动生成 .icns");
  }

  // 生成 Web Favicons
  console.log("");
  console.log("🌐 生成 Web Favicons...");
  for (const { size, name } of faviconSizes) {
    const png = await svgToPng(size);
    writeFileSync(join(FAVICON_DIR, name), png);
    console.log(`  ✓ ${name} (${size}x${size})`);
  }

  // 生成 favicon.ico (多尺寸)
  console.log("  ⏳ 生成 favicon.ico...");
  const ico16 = await svgToPng(16);
  const ico32 = await svgToPng(32);
  const ico48 = await svgToPng(48);

  // 使用 sharp 合并为 ico（简化版，只用 32x32）
  await sharp(ico32).toFile(join(FAVICON_DIR, "favicon.ico"));
  console.log("  ✓ favicon.ico");

  // 复制 SVG
  cpSync(SOURCE_SVG, join(FAVICON_DIR, "icon.svg"));
  console.log("  ✓ icon.svg");

  // 生成 site.webmanifest
  const manifest = {
    name: "QuickStation",
    short_name: "QuickStation",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#007AFF",
    background_color: "#ffffff",
    display: "standalone",
  };
  writeFileSync(join(FAVICON_DIR, "site.webmanifest"), JSON.stringify(manifest, null, 2));
  console.log("  ✓ site.webmanifest");

  // 复制到 public 目录
  console.log("");
  console.log("📦 复制到 public 目录...");
  const publicFiles = [
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "apple-touch-icon.png",
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "site.webmanifest",
  ];
  for (const file of publicFiles) {
    cpSync(join(FAVICON_DIR, file), join(PUBLIC_DIR, file));
  }
  console.log("  ✓ 已复制到 public/");

  // 完成
  console.log("");
  console.log("✅ 全部完成!");
  console.log("");
  console.log("📁 输出文件:");
  console.log(`   ${OUTPUT_DIR}/`);
  console.log("   ├── AppIcon.icns          <- Xcode 用");
  console.log("   └── AppIcon.iconset/");
  console.log("");
  console.log("   public/ (已自动复制)");
  console.log("   ├── favicon.ico");
  console.log("   ├── favicon-*.png");
  console.log("   ├── apple-touch-icon.png");
  console.log("   ├── android-chrome-*.png");
  console.log("   └── site.webmanifest");
}

main().catch(console.error);
