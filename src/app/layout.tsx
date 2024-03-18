import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/layouts/header";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Giờ lễ các giáo xứ trên toàn quốc",
  description:
    "Giole.com.vn là website chuyên cung cấp thông tin giờ lễ các nhà thờ, giáo xứ tại Việt Nam. Cung cấp thông tin giờ lễ nhà thờ chính xác và cập nhật nhanh nhất. Tìm kiếm theo vị trí, tên nhà thờ. Giao diện đơn giản, dễ sử dụng, thân thiện với mọi thiết bị.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <link rel="icon" href="favicon.svg" sizes="any" type="image/svg+xml" />
      <body className={inter.className}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
