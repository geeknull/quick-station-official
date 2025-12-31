import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

// 静态导出必需
export const dynamic = "force-static";

const baseUrl = "https://qs.geeknull.com";

// 所有页面路径
const pages = [
  "", // 首页
  "/privacy", // 隐私政策
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${page}`;

      // 构建语言替代链接
      const languages: Record<string, string> = {};
      for (const altLocale of locales) {
        languages[altLocale] = `${baseUrl}/${altLocale}${page}`;
      }
      // 添加 x-default 指向默认语言
      languages["x-default"] = `${baseUrl}/zh${page}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages,
        },
      });
    }
  }

  return sitemapEntries;
}
