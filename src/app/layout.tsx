import "./globals.css";

// 根 layout 最小化，语言相关的 metadata 和 providers 移到 [locale]/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
