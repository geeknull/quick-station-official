"use client";

import { useState } from "react";

const appIcons = [
  { name: "Xcode", color: "#147EFB", icon: "hammer" },
  { name: "Figma", color: "#F24E1E", icon: "figma" },
  { name: "Slack", color: "#4A154B", icon: "slack" },
  { name: "Terminal", color: "#000000", icon: "terminal" },
  { name: "Safari", color: "#006CFF", icon: "safari" },
  { name: "Music", color: "#FA2D48", icon: "music" },
  { name: "Notes", color: "#FFCC00", icon: "notes" },
  { name: "Photos", color: "#FF9500", icon: "photos" },
  // 以下图标注释掉，方便调试不同数量
  // { name: "Mail", color: "#007AFF", icon: "mail" },
  // { name: "Calendar", color: "#FF3B30", icon: "calendar" },
  // { name: "Messages", color: "#34C759", icon: "messages" },
  // { name: "Maps", color: "#5AC8FA", icon: "maps" },
  // { name: "Settings", color: "#8E8E93", icon: "settings" },
  // { name: "Clock", color: "#FF9500", icon: "clock" },
  // { name: "Weather", color: "#5AC8FA", icon: "weather" },
];

// 四舍五入到小数点后2位，确保服务端和客户端一致
const round = (n: number) => Math.round(n * 100) / 100;

interface RingLauncherProps {
  animated?: boolean;
  showLabels?: boolean;
}

export function RingLauncher({
  animated = true,
  showLabels = false,
}: RingLauncherProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [centerHovered, setCenterHovered] = useState(false);

  const getSegmentPosition = (index: number, total: number) => {
    // 使用 index + 0.5 让图标位于扇形区域中心而非边界线上
    const angle = ((index + 0.5) / total) * 2 * Math.PI - Math.PI / 2;
    // 扇形区域：内半径60，外半径140，中心为100（基于viewBox 360，半径180）
    // 返回百分比值（相对于容器半径），让位置随容器缩放
    const radius = 100;
    const radiusPercent = (radius / 180) * 50; // 转为相对于容器50%的百分比
    const x = round(Math.cos(angle) * radiusPercent);
    const y = round(Math.sin(angle) * radiusPercent);
    return { x, y };
  };

  return (
    <div className={`ring-launcher ${animated ? "animate-float" : ""}`}>
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 blur-xl" />

      {/* Main ring background */}
      <div className="ring-outer glass" />

      {/* Segment dividers */}
      <svg className="absolute inset-0 w-full h-full" viewBox="-180 -180 360 360">
        {appIcons.map((_, index) => {
          const startAngle = (index / appIcons.length) * 360 - 90;
          const endAngle = ((index + 1) / appIcons.length) * 360 - 90;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          const innerRadius = 60;
          const outerRadius = 140;

          const x1 = round(Math.cos(startRad) * innerRadius);
          const y1 = round(Math.sin(startRad) * innerRadius);
          const x2 = round(Math.cos(startRad) * outerRadius);
          const y2 = round(Math.sin(startRad) * outerRadius);
          const x3 = round(Math.cos(endRad) * outerRadius);
          const y3 = round(Math.sin(endRad) * outerRadius);
          const x4 = round(Math.cos(endRad) * innerRadius);
          const y4 = round(Math.sin(endRad) * innerRadius);

          const isHovered = hoveredIndex === index;

          return (
            <path
              key={index}
              d={`M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`}
              fill={isHovered ? "var(--primary)" : "transparent"}
              fillOpacity={isHovered ? 0.15 : 0}
              stroke="var(--border)"
              strokeWidth="1"
              className="transition-all duration-200 cursor-pointer"
              style={{ pointerEvents: "all" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          );
        })}
      </svg>

      {/* App icons on ring */}
      {appIcons.map((app, index) => {
        const pos = getSegmentPosition(index, appIcons.length);
        const isHovered = hoveredIndex === index;

        return (
          <div
            key={app.name}
            className="absolute transition-all duration-200 cursor-pointer"
            style={{
              left: `calc(50% + ${pos.x}%)`,
              top: `calc(50% + ${pos.y}%)`,
              transform: `translate(-50%, -50%) ${isHovered ? "scale(1.15)" : "scale(1)"}`,
              zIndex: isHovered ? 20 : 1,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center shadow-lg transition-all duration-200 ${
                isHovered ? "ring-2 ring-[var(--primary)] ring-offset-2" : ""
              }`}
              style={{ backgroundColor: app.color }}
            >
              <AppIcon name={app.icon} />
            </div>
            {showLabels && isHovered && (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap z-30 bg-[var(--background)] px-2 py-0.5 rounded shadow-sm">
                {app.name}
              </div>
            )}
          </div>
        );
      })}

      {/* Center icon */}
      <div
        className={`ring-center glass cursor-pointer transition-all duration-200 ${
          centerHovered ? "ring-2 ring-[var(--primary)]" : ""
        }`}
        style={{
          transform: `translate(-50%, -50%) ${centerHovered ? "scale(1.05)" : "scale(1)"}`,
        }}
        onMouseEnter={() => setCenterHovered(true)}
        onMouseLeave={() => setCenterHovered(false)}
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#147EFB] to-[#0A5DC2] flex items-center justify-center shadow-lg">
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function AppIcon({ name }: { name: string }) {
  const iconClass = "w-5 h-5 md:w-6 md:h-6 text-white";

  switch (name) {
    case "hammer":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 19.63L13.43 8.2l1.42 1.42L3.42 21 2 19.63zm14.01-11.3l1.42-1.42 3.54 3.54-1.42 1.41-3.54-3.53zm-5.66-2.83L14.9 2l1.41 1.41-4.55 4.55-1.41-1.42zm6.36 7.78l4.24-4.24-1.42-1.42-4.24 4.25 1.42 1.41z" />
        </svg>
      );
    case "figma":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5zM12 2h3.5a3.5 3.5 0 010 7H12V2zm0 8.5h3.5a3.5 3.5 0 110 7H12v-7zm-7 7a3.5 3.5 0 017 0 3.5 3.5 0 01-7 0zM5 12a3.5 3.5 0 013.5-3.5H12v7H8.5A3.5 3.5 0 015 12z" />
        </svg>
      );
    case "slack":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z" />
        </svg>
      );
    case "terminal":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm2 2l4 4-4 4 1.5 1.5L9 13l3.5-3.5L9 6 7.5 7.5z" />
        </svg>
      );
    case "safari":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5l-7-3-3-7 7 3 3 7z" />
        </svg>
      );
    case "music":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      );
    case "notes":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
        </svg>
      );
    case "photos":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      );
    case "mail":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      );
    case "calendar":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
        </svg>
      );
    case "messages":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
        </svg>
      );
    case "maps":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      );
    case "settings":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
      );
    case "clock":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
        </svg>
      );
    case "weather":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z" />
        </svg>
      );
    default:
      return null;
  }
}
