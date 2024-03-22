import { Church } from "./church";
import { District } from "./district";
import { Province } from "./province";

export type InitResponse = {
  churches: Church[];
  districts: District[];
  provinces: Province[];
};

export interface ListResponse<T> {
  data: T[];
}

export type SearchParams = {
  churchName?: string;
  province?: string;
  district?: string;
};
