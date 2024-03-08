import { District } from "./district";

export type Province = {
  id: number;
  name: string;
  unaccent_name: string;
  slug: string;
  code: number;
  division_type: number;
  districts?: District[];
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
};
