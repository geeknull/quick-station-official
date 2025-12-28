export const zh = {
  // 导航
  nav: {
    features: "功能特性",
    howItWorks: "使用方式",
    download: "下载",
  },

  // Hero 区域
  hero: {
    tagline: "为 macOS 设计的极速启动器",
    description:
      "通过快捷键呼出定制化的圆形交互界面，实现应用的极速切换。简洁、高效，让应用启动成为肌肉记忆。",
    downloadButton: "下载",
    learnMore: "了解更多",
    downloadOptions: {
      appStore: "App Store",
      direct: "直接下载",
      appStoreUnavailable: "应用待上架，请使用直接下载",
    },
  },

  // 设计哲学
  philosophy: {
    title: "我们的设计哲学",
    simple: {
      title: "简",
      subtitle: "简洁",
      description:
        "摒弃一切干扰。我们相信，强大的工具始于专注、无干扰的体验。QuickStation 的每一个像素都为此而生，为用户带来优雅、简洁的视觉感受。",
    },
    efficient: {
      title: "效",
      subtitle: "效率",
      description:
        "毫秒间的响应。我们追求的是肌肉记忆般的流畅操作。从快捷键呼出到应用启动，每一步都经过优化，确保用户以最快的速度达成目标。",
    },
  },

  // 功能特性
  features: {
    title: "核心特性",
    subtitle: "每一个细节，都为效率而生",
    items: {
      circularLayout: {
        title: "以焦点为中心的圆形布局",
        description:
          "创新的圆形设计将鼠标移动距离降至最低。中心放置核心应用，周围环绕快捷应用，这种布局天然符合直觉，让选择变得毫不费力。",
      },
      instantTrigger: {
        title: "一触即达的核心体验",
        description:
          "QuickStation 的一切始于一个快捷键。它是一个存在于无形，却能在你需要时瞬间响应的效率核心。",
      },
      smartHighlight: {
        title: "即时高亮，轻松选择",
        description:
          "无需精确瞄准。只需将光标滑向目标方向，对应扇区即刻高亮响应。视觉反馈清晰直接，让每一次点击都充满确定性。",
      },
      livePreview: {
        title: "实时预览，所见即所得",
        description:
          "无需猜测，无需保存。你在配置列表中的任何改动，都会即时反映在预览区域。这确保了配置过程的直观、高效和零错误。",
      },
      flexibleSelection: {
        title: "两种方式，灵活选择你的应用集",
        description:
          "从已安装应用中一次性构建你的理想启动列表，或从当前正在运行的应用中快速添加，即时配置，即时使用。",
      },
      systemIntegration: {
        title: "深度集成，无缝融入系统",
        description:
          "支持开机启动、Dock 栏显示、状态栏图标等系统选项。选择最适合你工作习惯的集成方式。",
      },
    },
  },

  // 使用方式
  howItWorks: {
    title: "简单三步，极速启动",
    steps: {
      step1: {
        title: "按下快捷键",
        description: "使用自定义快捷键呼出启动器",
      },
      step2: {
        title: "选择应用",
        description: "点击中心或滑向目标扇区",
      },
      step3: {
        title: "即刻启动",
        description: "应用瞬间启动，浮层自动消失",
      },
    },
  },

  // 下载区域
  download: {
    title: "立即体验 QuickStation",
    subtitle: "重新定义你的应用启动效率",
    button: "在 Mac App Store 下载",
    systemRequirements: "需要 macOS 11.0 或更高版本",
    features: {
      free: "免费下载",
      noAds: "无广告",
      privacy: "隐私优先",
    },
  },

  // 页脚
  footer: {
    contact: "联系我们",
    wechat: "微信公众号",
    scanQR: "扫码关注获取更新",
    copyright: "QuickStation. 保留所有权利。",
    madeWith: "用",
    madeFor: "为 macOS 用户打造",
  },

  // 语言切换
  language: {
    zh: "中文",
    en: "English",
  },

  // 主题切换
  theme: {
    system: "跟随系统",
    light: "浅色",
    dark: "深色",
  },
};

export type Translations = {
  nav: {
    features: string;
    howItWorks: string;
    download: string;
  };
  hero: {
    tagline: string;
    description: string;
    downloadButton: string;
    learnMore: string;
    downloadOptions: {
      appStore: string;
      direct: string;
      appStoreUnavailable: string;
    };
  };
  philosophy: {
    title: string;
    simple: {
      title: string;
      subtitle: string;
      description: string;
    };
    efficient: {
      title: string;
      subtitle: string;
      description: string;
    };
  };
  features: {
    title: string;
    subtitle: string;
    items: {
      circularLayout: { title: string; description: string };
      instantTrigger: { title: string; description: string };
      smartHighlight: { title: string; description: string };
      livePreview: { title: string; description: string };
      flexibleSelection: { title: string; description: string };
      systemIntegration: { title: string; description: string };
    };
  };
  howItWorks: {
    title: string;
    steps: {
      step1: { title: string; description: string };
      step2: { title: string; description: string };
      step3: { title: string; description: string };
    };
  };
  download: {
    title: string;
    subtitle: string;
    button: string;
    systemRequirements: string;
    features: {
      free: string;
      noAds: string;
      privacy: string;
    };
  };
  footer: {
    contact: string;
    wechat: string;
    scanQR: string;
    copyright: string;
    madeWith: string;
    madeFor: string;
  };
  language: {
    zh: string;
    en: string;
  };
  theme: {
    system: string;
    light: string;
    dark: string;
  };
};
