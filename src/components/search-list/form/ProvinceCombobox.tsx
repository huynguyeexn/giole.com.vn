import { FormTypes } from "@/form-schema/list-page-search-form";
import provinceServices from "@/services/province";
import { Province } from "@/types/province";
import { useEffect, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { CustomCombobox } from "./CustomCombobox";

type Props = {
  form: UseFormReturn<FormTypes, any, undefined>;
  field: ControllerRenderProps<FormTypes, "province">;
};

export function ProvinceCombobox({ form, field }: Props) {
  const [provinces, setProvinces] = useState<Province[]>([]);

  useEffect(() => {
    try {
      const getAllProvinces = async () => {
        const response = await provinceServices.getAllProvinces().catch();
        if (response) {
          setProvinces(
            response.map((p) => {
              p.slug = String(p.slug);
              return p;
            })
          );
        }
      };
      getAllProvinces();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <CustomCombobox
      name="province"
      placeholder="tỉnh thành"
      form={form}
      field={field}
      data={provinces}
    />
  );
}
