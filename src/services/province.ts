import useAxios from "@/hooks/useAxios";
import { Province } from "@/types/province";

const endpoint = "/provinces";

const provinceServices = {
  getAllProvinces: (): Promise<Province[]> => {
    return useAxios.get(`${endpoint}/all`);
  },
  getDistrictsByProvinceId: (id: number): Promise<Province> => {
    return useAxios.get(`${endpoint}/${id}`);
  },
  getDistrictsByProvinceSlug: (slug: string): Promise<Province> => {
    return useAxios.get(`${endpoint}/${slug}`);
  },
};

export default provinceServices;
