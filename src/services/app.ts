import useAxios from "@/hooks/useAxios";
import { ChurchList } from "@/types/church";

const appServices = {
  search: (query: string): Promise<ChurchList> => {
    return useAxios.get(`/search?${query}`);
  },
};

export default appServices;
