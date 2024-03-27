import MainHeader from "@/components/layouts/Header";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Giờ lễ - giờ thánh lễ nhà thờ, giáo xứ trên toàn quốc",
  description:
    "Thông tin giờ lễ, giờ thánh lễ nhà thờ, giáo xứ tại Việt Nam. Cung cấp thông tin giờ lễ nhà thờ chính xác và cập nhật nhanh nhất. Tìm kiếm theo vị trí, tên nhà thờ. Giao diện đơn giản, dễ sử dụng, thân thiện với mọi thiết bị.",
  keywords:
    "giờ lễ, giờ thánh lễ, giờ lễ nhà thờ, lễ nhà thờ, tìm kiếm giờ lễ, tìm giờ lễ, tìm kiếm giờ thánh lễ, tìm giờ thánh lễ, danh sách nhà thờ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
      <body className={clsx(inter.className, "text-sm")}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
