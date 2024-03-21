import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FindChurchFormValues } from ".";
import { DistrictCombobox } from "./district";
import { ProvinceCombobox } from "./province";

type Props = {
  form: UseFormReturn<FindChurchFormValues, any, undefined>;
};
export default function ComboboxWrapperComponent({ form }: Props) {
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
}
