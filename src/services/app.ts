import useAxios from "@/hooks/useAxios";
import { Church } from "@/types/church";
import { InitResponse } from "@/types/common";

const appServices = {
  getHomeInitData: (): Promise<InitResponse> => {
    return useAxios.get("/init");
  },
  search: (query: string): Promise<Church[]> => {
    return useAxios.get(`/search?${query}`);
  },
};

export default appServices;
