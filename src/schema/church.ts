import { District } from "./district";
import { Province } from "./province";

export type Church = {
  id: number;
  name: string;
  unaccent_name: string;
  slug: string;
  address: string;
  code: number;
  type: string;
  note: string;
  normal_day: string;
  saturday: string;
  sunday: string;
  lat: number;
  lng: number;
  place_id: string;
  province_id: number;
  district_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  province: Province;
  district: District;
};

export type ChurchPagination = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: string;
  path: string;
  from: number;
  to: number;
  data: Church[];
};

export const ChurchPaginationInitialValues = {
  total: 0,
  per_page: 0,
  current_page: 0,
  last_page: 0,
  first_page_url: "",
  last_page_url: "",
  next_page_url: "",
  prev_page_url: "",
  path: "",
  from: 0,
  to: 0,
  data: [],
};
