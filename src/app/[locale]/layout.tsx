import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { LocaleProvider } from "@/components/LocaleProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DownloadProvider } from "@/contexts/DownloadContext";
import { siteConfig } from "@/config/site";
import { locales, isValidLocale, type Locale } from "@/i18n/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 静态生成所有语言版本
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 动态生成 metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const baseUrl = "https://qs.geeknull.com";
  const typedLocale = locale as Locale;

  return {
    title: {
      default: `${siteConfig.name} - ${siteConfig.tagline[typedLocale]}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description[typedLocale],
    keywords: [
      "QuickStation",
      "macOS",
      "app launcher",
      "productivity",
      "快捷启动器",
      "效率工具",
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        zh: `${baseUrl}/zh`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/zh`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      title: siteConfig.name,
      description: siteConfig.description[typedLocale],
      siteName: siteConfig.name,
      url: `${baseUrl}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description[typedLocale],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 验证 locale 是否有效
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href={siteConfig.wechat.qrCodeUrl}
          as="image"
          type="image/jpeg"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <DownloadProvider>
            <LocaleProvider locale={locale}>{children}</LocaleProvider>
          </DownloadProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
