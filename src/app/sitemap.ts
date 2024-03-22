const BASE_URL = "https://giole.com.vn";

import { MetadataRoute } from "next";
import provinceServices from "../services/province";
export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return Array(64)
    .fill({})
    .map((_, index) => ({
      id: index + 1,
    }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  if (id === 1) {
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        priority: 1,
        changeFrequency: "monthly",
      },
      {
        url: `${BASE_URL}/danh-sach`,
        lastModified: new Date(),
        priority: 0.9,
        changeFrequency: "monthly",
      },
    ];
  }

  const genUrl = (churchName = "", province = "", district = "") => {
    return `${BASE_URL}/danh-sach/${province}/${churchName}`;
  };

  try {
    const provinceData = await provinceServices.getDistrictsByProvinceId(id);
    const districtData = provinceData.districts;
    const churchesData = provinceData.churches;
    if (churchesData) {
      const result = churchesData.map((church) => {
        const name = church.unaccent_name;
        const province = provinceData.slug;
        const district =
          districtData?.find((d) => Number(d.id) == church.district_id)?.slug ||
          "";

        const url = genUrl(name, province, district);

        return {
          url: url,
          lastModified: new Date(),
          priority: 0.8,
          changeFrequency: "monthly" as "monthly",
        };
      });
      return result;
    }
  } catch (error) {
    console.error(error);
  }

  return [];
}
