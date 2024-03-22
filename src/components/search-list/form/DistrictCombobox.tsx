import { FormTypes } from "@/form-schema/list-page-search-form";
import provinceServices from "@/services/province";
import { District } from "@/types/district";
import { useEffect, useState } from "react";
import {
  ControllerRenderProps,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import { CustomCombobox } from "./CustomCombobox";

type Props = {
  form: UseFormReturn<FormTypes, any, undefined>;
  field: ControllerRenderProps<FormTypes, "district">;
};

export function DistrictCombobox({ form, field }: Props) {
  const [districts, setDistricts] = useState<District[]>([]);

  const provinceSlug = useWatch({
    control: form.control,
    name: "province",
  });

  useEffect(() => {
    if (!provinceSlug) {
      setDistricts([]);
      form.setValue("district", "");
      return;
    }
    try {
      const getDistrictsByProvinceId = async () => {
        const response = await provinceServices
          .getDistrictsByProvinceSlug(provinceSlug)
          .catch();
        if (response.districts) {
          setDistricts(response.districts);

          // After redirect to page has province param
          // Change province
          // => District has been reset
          if (form.formState.defaultValues?.province !== provinceSlug) {
            form.setValue("district", "");
          }
        }
      };
      getDistrictsByProvinceId();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceSlug]);

  return (
    <CustomCombobox
      name="district"
      placeholder="quận huyện"
      form={form}
      field={field}
      data={districts}
    />
  );
}
