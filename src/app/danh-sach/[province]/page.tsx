import appServices from "@/services/app";
import provinceServices from "@/services/province";
import {
  ChurchPagination,
  ChurchPaginationInitialValues,
} from "@/schema/church";
import { mapDivisionType } from "@/utils/helpers";
import ChurchByProvinceComponent from "./component";

type ChurchByProvincePageProps = {
  params: { province: string };
};

export default async function ChurchByProvincePage({
  params,
}: ChurchByProvincePageProps) {
  let churches: ChurchPagination = ChurchPaginationInitialValues;

  const results = await appServices.search("province=" + params.province);
  if (results) {
    churches = results;
  }
  return <ChurchByProvinceComponent churches={churches} />;
}

export async function generateMetadata({ params }: ChurchByProvincePageProps) {
  const results = await provinceServices.getDistrictsByProvinceSlug(
    params.province
  );
  if (results) {
    const address = mapDivisionType(results.name, results.division_type);

    return {
      title: `Giờ lễ các nhà thờ tại ${address}`,
      keywords: `nhà thờ ở ${address}, nhà thờ ${address}, giờ lễ ${address}, giờ thánh lễ ${address}, giờ lễ, giờ thánh lễ, giờ lễ nhà thờ, lễ nhà thờ, tìm kiếm giờ lễ, tìm giờ lễ, tìm kiếm giờ thánh lễ, tìm giờ thánh lễ, danh sách nhà thờ,danh sách nhà thờ ${address},giờ lễ nhà thờ ${address}, lễ nhà thờ ${address}, tìm kiếm giờ lễ ${address} tìm giờ lễ ${address}, tìm kiếm giờ thánh lễ ${address}, tìm giờ thánh lễ ${address}, danh sách nhà thờ ${address},`,
    };
  }

  return {
    title: "Giờ lễ các nhà thờ tại " + params.province,
  };
}
