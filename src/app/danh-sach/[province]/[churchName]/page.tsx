import { ResultListComponent } from "@/components/search-list/result";
import appServices from "@/services/app";
import provinceServices from "@/services/province";
import { ChurchPagination } from "@/schema/church";
import { mapDivisionType, mapChurchType } from "@/utils/helpers";
import React from "react";
import { Suspense } from "react";
import { toQueryString } from "@/utils/helpers";

type ChurchByProvinceAndNamePageProps = {
  params: {
    province: string;
    churchName: string;
  };
  searchParams: {};
};

export default async function ChurchByProvinceAndNamePage({
  params,
}: ChurchByProvinceAndNamePageProps) {
  let churches: ChurchPagination = {
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

  const newParams = {
    churchName: decodeURI(params.churchName),
    province: decodeURI(params.province),
  };
  const results = await appServices.search(toQueryString(newParams));
  if (results) {
    churches = results;
  }

  return (
    <Suspense>
      <ResultListComponent churches={churches} />
    </Suspense>
  );
}

export async function generateMetadata({
  params,
}: ChurchByProvinceAndNamePageProps) {
  const newParams = {
    churchName: decodeURI(params.churchName),
    province: decodeURI(params.province),
  };

  const response = await appServices.search(toQueryString(newParams));
  const results = response.data[0];

  if (results) {
    return {
      title:
        "Giờ lễ " +
        mapChurchType(results.name, results.type) +
        " - " +
        mapDivisionType(results.province.name, results.province.division_type),
    };
  }

  return {
    title: "Giờ lễ nhà thờ",
  };
}
