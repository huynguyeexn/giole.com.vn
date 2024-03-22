import { ResultListComponent } from "@/components/search-list/result";
import appServices from "@/services/app";
import { ChurchList } from "@/types/church";
import { Suspense } from "react";

export default async function ListPage() {
  let churches: ChurchList = {
    total: 0,
    per_page: 0,
    current_page: 0,
    last_page: 0,
    first_page_url: "",
    last_page_url: "",
    next_page_url: "",
    prev_page_url: "",
    path: "",
    from: 0,
    to: 0,
    data: [],
  };

  const results = await appServices.search("");
  if (results) {
    churches = results;
  }

  return (
    <Suspense>
      <ResultListComponent initChurches={churches} />
    </Suspense>
  );
}
