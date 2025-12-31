"use client";

import { useLocale } from "@/i18n";
import { siteConfig } from "@/config/site";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import Link from "next/link";

export default function PrivacyPage() {
  const { locale, t } = useLocale();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md py-2">
        <div className="container flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/apple-touch-icon.png"
              alt={siteConfig.name}
              className="w-12 h-12 rounded-xl"
            />
            <span className="font-semibold text-xl">{siteConfig.name}</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href={`/${locale}`}
              className="px-5 py-2.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)] rounded-lg transition-all"
            >
              {t.privacy.backToHome}
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-3xl">
        <div className="pt-2 pb-16">
          {locale === "zh" ? <PrivacyContentZH /> : <PrivacyContentEN />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-6">
        <div className="container text-center text-sm text-[var(--muted)]">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </div>
      </footer>
    </div>
  );
}

function PrivacyContentEN() {
  const currentYear = new Date().getFullYear();
  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-[var(--muted)] mb-8">Last updated: {currentYear}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <p>
          QuickStation respects your privacy. This app{" "}
          <strong>does not collect, store, or transmit any personal data</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Data Collection</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We do not collect any personal information</li>
          <li>We do not track user behavior</li>
          <li>We do not use any analytics services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Local Data</h2>
        <p className="mb-4">
          All settings and configuration data are stored locally on your device
          only, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Keyboard shortcuts</li>
          <li>Application list</li>
          <li>UI preferences</li>
        </ul>
        <p className="mt-4">This data is never uploaded to any server.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Network Access</h2>
        <p className="mb-4">The app may access the network for:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Checking for software updates (optional)</li>
        </ul>
        <p className="mt-4">No other network communication occurs.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">System Permissions</h2>
        <p className="mb-4">The app requires the following system permissions:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Input Monitoring</strong>: Used to detect global keyboard
            shortcuts. All processing is local; no keystrokes are recorded or
            transmitted.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
        <p>
          This app does not integrate any third-party analytics, advertising, or
          tracking services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact</h2>
        <p>For privacy-related questions, please contact:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            Website:{" "}
            <a
              href="https://qs.geeknull.com"
              className="text-[var(--primary)] hover:underline"
            >
              qs.geeknull.com
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}

function PrivacyContentZH() {
  const currentYear = new Date().getFullYear();
  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-2">隐私政策</h1>
      <p className="text-[var(--muted)] mb-8">最后更新：{currentYear}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">简述</h2>
        <p>
          QuickStation 尊重您的隐私。本应用
          <strong>不收集、存储或传输任何个人数据</strong>。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">数据收集</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>我们不收集任何个人信息</li>
          <li>我们不追踪用户行为</li>
          <li>我们不使用任何分析服务</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">本地数据</h2>
        <p className="mb-4">
          应用的所有设置和配置数据仅存储在您的本地设备上，包括：
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>快捷键设置</li>
          <li>应用列表</li>
          <li>界面偏好</li>
        </ul>
        <p className="mt-4">这些数据不会上传到任何服务器。</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">网络访问</h2>
        <p className="mb-4">应用可能访问网络用于：</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>检查软件更新（可选）</li>
        </ul>
        <p className="mt-4">除此之外，应用不进行任何网络通信。</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">系统权限</h2>
        <p className="mb-4">应用需要以下系统权限：</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>输入监控</strong>
            ：用于检测全局快捷键，仅在本地处理，不记录或传输任何按键信息
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">第三方服务</h2>
        <p>本应用不集成任何第三方分析、广告或追踪服务。</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">联系方式</h2>
        <p>如有隐私相关问题，请通过以下方式联系：</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            官网：
            <a
              href="https://qs.geeknull.com"
              className="text-[var(--primary)] hover:underline"
            >
              qs.geeknull.com
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}
