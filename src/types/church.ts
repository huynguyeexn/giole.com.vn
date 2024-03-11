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
