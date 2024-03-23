import { ResultListComponent } from "@/components/search-list/result";
import { Suspense } from "react";

export default async function ListPage() {
  return (
    <Suspense>
      <ResultListComponent />
    </Suspense>
  );
}
