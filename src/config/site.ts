export const siteConfig = {
  name: "QuickStation",
  tagline: {
    zh: "为 macOS 设计的极速启动器",
    en: "Lightning-fast App Launcher for macOS",
  },
  description: {
    zh: "通过快捷键呼出定制化的圆形交互界面，实现应用的极速切换。简洁、高效，让应用启动成为肌肉记忆。",
    en: "Invoke a customizable circular interface with a hotkey for instant app switching. Simple, efficient, making app launching muscle memory.",
  },

  // ============================================
  // 下载链接配置
  // ============================================
  download: {
    // App Store 链接（上架后填写）
    appStoreUrl: "https://apps.apple.com/app/quickstation/id000000000",
    // 直接下载链接
    directUrl: "/downloads/QuickStation.dmg",
    // App Store 是否已上架（上架后改为 true）
    appStoreAvailable: false,
  },

  // ============================================
  // 微信公众号配置 - 请在此处填写您的公众号信息
  // ============================================
  wechat: {
    name: "QuickStation",
    qrCodeUrl: "/qrcode_weixin_mp.jpg",
  },

  // ============================================
  // 其他联系方式（可选）
  // ============================================
  contact: {
    email: "",
    twitter: "",
    github: "",
  },

  // 系统要求
  systemRequirements: {
    zh: "需要 macOS 13.0 或更高版本",
    en: "Requires macOS 13.0 or later",
  },

  // 版权信息
  copyright: {
    zh: "QuickStation. 保留所有权利。",
    en: "QuickStation. All rights reserved.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
