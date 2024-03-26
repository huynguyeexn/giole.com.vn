"use server";
import { SearchPageLayout } from "@/components/layouts/SearchPage";
import { Suspense } from "react";

export default async function ListPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <SearchPageLayout>{children}</SearchPageLayout>
    </Suspense>
  );
}
