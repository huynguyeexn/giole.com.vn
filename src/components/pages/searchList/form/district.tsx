// "use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { CommandSeparator } from "cmdk";
import * as React from "react";
import {
  ControllerRenderProps,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import { FindChurchFormValues } from ".";
import { FormControl } from "@/components/ui/form";
import { District } from "@/types/district";
import provinceServices from "@/services/province";
import { mapDivisionType, toUnaccentName } from "@/utils/helpers";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type Props = {
  form: UseFormReturn<FindChurchFormValues, any, undefined>;
  field: ControllerRenderProps<FindChurchFormValues, "district">;
};

export function DistrictCombobox({ form, field }: Props) {
  const [districts, setDistricts] = React.useState<District[]>([]);

  const searchParams = useSearchParams();
  const districtParam = searchParams.get("district") || "";

  const provinceSlug = useWatch({
    control: form.control,
    name: "province",
  });

  const handleFilter = (id: string, search: string) => {
    const extendValue = districts.find((d) => d.slug === id)?.unaccent_name;
    const extendSearch = toUnaccentName(search);

    if (extendValue?.includes(extendSearch)) return 1;
    return 0;
  };

  React.useEffect(() => {
    if (districtParam) {
      form.setValue("district", districtParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtParam]);

  React.useEffect(() => {
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
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full sm:w-[200px] justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? districts.find((district) => district.slug === field.value)
                  ?.name
              : "Chọn quận huyện"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="sm:w-[200px] p-0">
        <Command filter={handleFilter}>
          <CommandInput placeholder="Tìm quận huyện..." className="h-9" />
          <CommandEmpty>Không tìm thấy quận huyện.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                value={""}
                onSelect={() => {
                  form.setValue("district", "");
                }}
              >
                Tất cả
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    "" === field.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              {districts?.map((districts) => (
                <CommandItem
                  value={districts.slug}
                  key={districts.slug}
                  onSelect={() => {
                    form.setValue("district", districts.slug);
                  }}
                >
                  {mapDivisionType(districts.name, districts.division_type)}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      districts.slug === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
