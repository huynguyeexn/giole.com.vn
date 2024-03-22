import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { DistrictCombobox } from "./DistrictCombobox";
import { ProvinceCombobox } from "./ProvinceCombobox";
import { FormTypes } from "@/form-schema/list-page-search-form";

type FiltersComponentProps = {
  form: UseFormReturn<FormTypes, any, undefined>;
};
export const FiltersComponent = ({ form }: FiltersComponentProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="province"
        render={({ field }) => (
          <FormItem className="grow relative">
            <FormLabel>Tỉnh thành</FormLabel>
            <div className="w-full">
              <ProvinceCombobox form={form} field={field} />
            </div>
            <div className="absolute -bottom-6 left-0">
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="district"
        render={({ field }) => (
          <FormItem className="grow relative">
            <FormLabel>Quận huyện</FormLabel>
            <FormControl>
              <div className="w-full">
                <DistrictCombobox form={form} field={field} />
              </div>
            </FormControl>
            <div className="absolute -bottom-6 left-0">
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </>
  );
};
