import { AntdRegistry } from "@ant-design/nextjs-registry";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import SWRProvider from "./components/swrProvider";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Giờ lễ",
  description: "Tra cứu, tìm kiếm thông tin giờ lễ các giáo xứ trên toàn quốc",
  authors: [{ name: "Hui", url: "https://github.com/huynguyeexn" }],
};

const style = { padding: 0, margin: 0 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <link rel="icon" href="favicon.svg" sizes="any" />
      <body style={style} className={inter.className}>
        <SWRProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </SWRProvider>
      </body>
    </html>
  );
}
