import provinceServices from "@/services/province";
import { MAIN_SITEMAP_ID } from "@/utils/constants";
import { MetadataRoute } from "next";

const BASE_URL = process.env.BASE_URL || "https://giole.com.vn";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const allProvinces = await provinceServices.getAllProvinces();
  const sitemap = allProvinces.map((p) => `${BASE_URL}/sitemap/${p.id}.xml`);
  sitemap.push(`${BASE_URL}/sitemap/${MAIN_SITEMAP_ID}.xml`);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap,
  };
}
