import { MetadataRoute } from "next";
import provinceServices from "@/services/province";
import { MAIN_SITEMAP_ID } from "@/utils/constants";

const BASE_URL = process.env.BASE_URL || "https://giole.com.vn";

export async function generateSitemaps() {
  const resuldIds: Array<{ id?: number | string | null }> = [];
  const allProvinces = await provinceServices.getAllProvinces();

  allProvinces.forEach((province) => {
    resuldIds.push({
      id: province.id,
    });
  });

  resuldIds.push({ id: MAIN_SITEMAP_ID });
  return resuldIds;
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const sitemaps: MetadataRoute.Sitemap = [];

  // Home, Search Page
  if (id === MAIN_SITEMAP_ID) {
    sitemaps.push({
      url: BASE_URL,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: "daily",
    });
    sitemaps.push({
      url: `${BASE_URL}/danh-sach`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "daily",
    });
  } else {
    // Churches detail page
    try {
      const provinceData = await provinceServices.getDistrictsByProvinceId(id);
      const churchesData = provinceData.churches;

      const genUrl = (churchName = "", province = "") => {
        if (province) {
          province = `/${province}`;
        }
        if (churchName) {
          churchName = `/${encodeURI(churchName)}`;
        }

        return `${BASE_URL}/danh-sach${province}${churchName}`;
      };

      if (provinceData) {
        const url = genUrl("", provinceData.slug);

        sitemaps.push({
          url: url,
          lastModified: new Date(),
          priority: 0.8,
          changeFrequency: "daily" as "daily",
        });
      }

      if (churchesData) {
        const churchesUrls = churchesData.map((church) => {
          const name = church.unaccent_name;
          const province = provinceData.slug;
          const url = genUrl(name, province);

          return {
            url: url,
            lastModified: new Date(),
            priority: 0.8,
            changeFrequency: "daily" as "daily",
          };
        });

        sitemaps.push(...churchesUrls);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return sitemaps;
}
