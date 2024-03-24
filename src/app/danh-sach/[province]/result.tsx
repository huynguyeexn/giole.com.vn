import { ChurchPagination } from "@/schema/church";
import { Suspense } from "react";
import { ResultListComponent } from "@/components/search-list/result";

type PageProvinceResultProps = {
  churches: ChurchPagination;
};

export default function PageProvinceResultComponent({
  churches,
}: PageProvinceResultProps) {
  return (
    <Suspense>
      <ResultListComponent churches={churches} />
    </Suspense>
  );
}
