import { ResultListComponent } from "@/components/search-list/result";
import appServices from "@/services/app";
import provinceServices from "@/services/province";
import { ChurchList } from "@/types/church";
import { mapDivisionType } from "@/utils/helpers";
import React from "react";
import { Suspense } from "react";

type ChurchByProvincePageProps = {
  params: { province: string };
  searchParams: {};
};

export default async function ChurchByProvincePage({
  params,
}: ChurchByProvincePageProps) {
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

  const results = await appServices.search("province=" + params.province);
  if (results) {
    churches = results;
  }

  return (
    <Suspense>
      <ResultListComponent initChurches={churches} />
    </Suspense>
  );
}

export async function generateMetadata({ params }: ChurchByProvincePageProps) {
  const results = await provinceServices.getDistrictsByProvinceSlug(
    params.province
  );
  if (results) {
    return {
      title:
        "Giờ lễ các nhà thờ tại " +
        mapDivisionType(results.name, results.division_type),
    };
  }

  return {
    title: "Giờ lễ các nhà thờ tại " + params.province,
  };
}
