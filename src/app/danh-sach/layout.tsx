"use server";

import { SearchPageLayout } from "@/components/layouts/SearchPage";

export default async function ListPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SearchPageLayout>{children}</SearchPageLayout>;
}
