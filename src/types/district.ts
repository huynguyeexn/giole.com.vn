export type District = {
  id: number;
  name: string;
  unaccent_name: string;
  slug: string;
  code: number;
  division_type: number;
  province_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
};
