import appServices from "@/services/app";
import provinceServices from "@/services/province";
import {
  ChurchPagination,
  ChurchPaginationInitialValues,
} from "@/schema/church";
import { mapDivisionType } from "@/utils/helpers";
import PageProvinceResultComponent from "./result";

type ChurchByProvincePageProps = {
  params: { province: string };
  searchParams: {};
};

export default async function ChurchByProvincePage({
  params,
}: ChurchByProvincePageProps) {
  let churches: ChurchPagination = ChurchPaginationInitialValues;

  const results = await appServices.search("province=" + params.province);
  if (results) {
    churches = results;
  }

  return <PageProvinceResultComponent churches={churches} />;
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
