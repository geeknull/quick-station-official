"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";

interface DownloadInfo {
  file: string;
  version: string;
  buildId: string;
  size: number;
  sizeFormatted: string;
  md5: string;
  sha256: string;
  downloadUrl: string;
  uploadedAt: string;
}

interface DownloadContextType {
  downloadInfo: DownloadInfo | null;
  loading: boolean;
}

const DownloadContext = createContext<DownloadContextType>({
  downloadInfo: null,
  loading: true,
});

// 模块级缓存，避免重复请求
let cachedData: DownloadInfo | null = null;
let fetchPromise: Promise<DownloadInfo> | null = null;

export function DownloadProvider({ children }: { children: ReactNode }) {
  const [downloadInfo, setDownloadInfo] = useState<DownloadInfo | null>(cachedData);
  const [loading, setLoading] = useState(!cachedData);

  useEffect(() => {
    if (cachedData) {
      setDownloadInfo(cachedData);
      setLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = fetch("https://qs.geeknull.com/downloads/latest")
        .then((res) => res.json())
        .then((data: DownloadInfo) => {
          cachedData = data;
          return data;
        });
    }

    fetchPromise
      .then((data) => {
        setDownloadInfo(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <DownloadContext.Provider value={{ downloadInfo, loading }}>
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownload() {
  return useContext(DownloadContext);
}
