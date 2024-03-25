import {
  ChurchPagination,
  ChurchPaginationInitialValues,
} from "@/schema/church";
import appServices from "@/services/app";
import { mapChurchType, mapDivisionType, toQueryString } from "@/utils/helpers";
import ChurchByNameComponent from "./component";

type ChurchByProvinceAndNamePageProps = {
  params: {
    province: string;
    churchName: string;
  };
};

export default async function ChurchByProvinceAndNamePage({
  params,
}: ChurchByProvinceAndNamePageProps) {
  let churches: ChurchPagination = ChurchPaginationInitialValues;

  const newParams = {
    churchName: decodeURI(params.churchName),
    province: decodeURI(params.province),
  };
  const results = await appServices.search(toQueryString(newParams));
  if (results) {
    churches = results;
  }

  return <ChurchByNameComponent churches={churches} />;
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
    const church = mapChurchType(results.name, results.type);
    const address = mapDivisionType(
      results.province.name,
      results.province.division_type
    );
    return {
      title: "Giờ lễ " + church + " - " + address,
      keywords: `
      ${church}, ${church} ${address}, giờ lễ ${church}, giờ thánh lễ ${church}, xem giờ lễ ${church}, xem giờ thánh lễ ${church}, tìm giờ lễ ${church}, tìm giờ thánh lễ ${church}, giờ lễ, giờ thánh lễ, giờ lễ nhà thờ, lễ nhà thờ, tìm giờ lễ, tìm kiếm giờ lễ, tìm giờ thánh lễ, tìm kiếm giờ thánh lễ,xem giờ lễ, xem kiếm giờ lễ, xem giờ thánh lễ, xem kiếm giờ thánh lễ`,
    };
  }

  return {
    title: "Giờ lễ nhà thờ" + params.churchName,
  };
}
