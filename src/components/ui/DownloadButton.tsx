"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/i18n";
import { useDownload } from "@/contexts/DownloadContext";
import { siteConfig } from "@/config/site";

interface DownloadButtonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function DownloadButton({
  size = "lg",
  className = "",
}: DownloadButtonProps) {
  const { t } = useLocale();
  const { downloadInfo } = useDownload();
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toast 自动消失
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // 复制成功提示自动消失
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(label);
  };

  const handleAppStoreClick = () => {
    if (siteConfig.download.appStoreAvailable) {
      window.open(siteConfig.download.appStoreUrl, "_blank");
    } else {
      setShowToast(true);
    }
    setIsOpen(false);
  };

  const handleDirectDownload = () => {
    if (!downloadInfo) return;
    const url = `https://qs.geeknull.com${downloadInfo.downloadUrl}`;
    window.location.href = url;
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full sm:w-auto ${className}`} ref={dropdownRef}>
      {/* 主按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full sm:w-auto inline-flex items-center justify-center gap-2 font-medium
          bg-[var(--primary)] text-white rounded-xl
          hover:opacity-90 transition-all whitespace-nowrap cursor-pointer
          ${sizes[size]}
        `}
      >
        <AppleIcon className="w-5 h-5" />
        <span>{t.hero.downloadButton}</span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[320px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-[999]">
          <button
            onClick={handleAppStoreClick}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left cursor-pointer"
          >
            <AppleIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="text-gray-800 dark:text-gray-200">
              {t.hero.downloadOptions.appStore}
            </span>
            {!siteConfig.download.appStoreAvailable && (
              <span className="ml-auto text-xs text-gray-400">{t.hero.downloadOptions.comingSoon}</span>
            )}
          </button>
          <button
            onClick={handleDirectDownload}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left cursor-pointer border-t border-gray-100 dark:border-gray-700"
          >
            <DownloadIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <div className="flex-1">
              <span className="text-gray-800 dark:text-gray-200">
                {t.hero.downloadOptions.direct}
              </span>
              {downloadInfo && (
                <div className="text-xs text-gray-400">
                  v{downloadInfo.version} · {downloadInfo.sizeFormatted}
                </div>
              )}
            </div>
          </button>
          {/* 下载链接和校验值展示 */}
          {downloadInfo && (
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="space-y-3">
                {/* 下载链接 */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{t.hero.downloadOptions.downloadLink}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(`https://qs.geeknull.com${downloadInfo.downloadUrl}`, 'url');
                      }}
                      className="text-xs text-[var(--primary)] hover:underline cursor-pointer"
                    >
                      {copySuccess === 'url' ? t.hero.downloadOptions.copied : t.hero.downloadOptions.copy}
                    </button>
                  </div>
                  <code className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block break-all">
                    https://qs.geeknull.com{downloadInfo.downloadUrl}
                  </code>
                </div>
                {/* 校验值 */}
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {t.hero.downloadOptions.verifyIntegrity}
                  </p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">MD5</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(downloadInfo.md5, 'md5');
                          }}
                          className="text-xs text-[var(--primary)] hover:underline cursor-pointer"
                        >
                          {copySuccess === 'md5' ? t.hero.downloadOptions.copied : t.hero.downloadOptions.copy}
                        </button>
                      </div>
                      <code className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block break-all">
                        {downloadInfo.md5}
                      </code>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">SHA256</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(downloadInfo.sha256, 'sha256');
                          }}
                          className="text-xs text-[var(--primary)] hover:underline cursor-pointer"
                        >
                          {copySuccess === 'sha256' ? t.hero.downloadOptions.copied : t.hero.downloadOptions.copy}
                        </button>
                      </div>
                      <code className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block break-all">
                        {downloadInfo.sha256}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Toast 提示 */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in-up">
          {t.hero.downloadOptions.appStoreUnavailable}
        </div>
      )}
    </div>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}
