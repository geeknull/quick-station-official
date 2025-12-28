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
];

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
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = 110;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
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

          const x1 = Math.cos(startRad) * innerRadius;
          const y1 = Math.sin(startRad) * innerRadius;
          const x2 = Math.cos(startRad) * outerRadius;
          const y2 = Math.sin(startRad) * outerRadius;
          const x3 = Math.cos(endRad) * outerRadius;
          const y3 = Math.sin(endRad) * outerRadius;
          const x4 = Math.cos(endRad) * innerRadius;
          const y4 = Math.sin(endRad) * innerRadius;

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
            className="absolute transition-all duration-200"
            style={{
              left: `calc(50% + ${pos.x}px)`,
              top: `calc(50% + ${pos.y}px)`,
              transform: `translate(-50%, -50%) ${isHovered ? "scale(1.15)" : "scale(1)"}`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 ${
                isHovered ? "ring-2 ring-[var(--primary)] ring-offset-2" : ""
              }`}
              style={{ backgroundColor: app.color }}
            >
              <AppIcon name={app.icon} />
            </div>
            {showLabels && isHovered && (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                {app.name}
              </div>
            )}
          </div>
        );
      })}

      {/* Center icon */}
      <div
        className={`ring-center glass cursor-pointer transition-all duration-200 ${
          centerHovered ? "ring-2 ring-[var(--primary)] scale-105" : ""
        }`}
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
  const iconClass = "w-6 h-6 md:w-7 md:h-7 text-white";

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
    default:
      return null;
  }
}
