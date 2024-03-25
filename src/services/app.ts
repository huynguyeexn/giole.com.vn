import useAxios from "@/hooks/useAxios";
import { ChurchPagination } from "@/schema/church";

const appServices = {
  search: (query: string): Promise<ChurchPagination> => {
    return useAxios.get(`/search?${query}`);
  },
};

export default appServices;
