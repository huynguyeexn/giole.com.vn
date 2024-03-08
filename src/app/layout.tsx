import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SWRProvider from "./components/swrProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Giờ thánh lễ",
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
    <html lang="en">
      <body style={style} className={inter.className}>
        <SWRProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </SWRProvider>
      </body>
    </html>
  );
}
