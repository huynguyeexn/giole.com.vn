import useAxios from "@/hooks/useAxios";
import { Church } from "@/types/church";

const appServices = {
  getHomeInitData: () => {
    return useAxios.get("/init");
  },
  search: (query: string): Promise<Church[]> => {
    return useAxios.get(`/search?${query}`);
  },
};

export default appServices;
