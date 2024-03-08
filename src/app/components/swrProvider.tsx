"use client";
import { configSWR } from "@/configs/app";
import { SWRConfig } from "swr";

const SWRProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SWRConfig value={configSWR}>{children}</SWRConfig>;
};

export default SWRProvider;
