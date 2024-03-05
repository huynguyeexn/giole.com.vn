import { Theme, ThemePanel } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "@radix-ui/themes/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Giờ thánh lễ",
  description: "Tra cứu, tìm kiếm thông tin giờ lễ các giáo xứ trên toàn quốc",
  authors: [{ name: "Hui", url: "https://github.com/huynguyeexn" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme panelBackground="solid" scaling="110%">
          {children}
        </Theme>
      </body>
    </html>
  );
}
