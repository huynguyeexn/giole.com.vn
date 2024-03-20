import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Province } from "@/types/province";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { FindChurchFormValues } from ".";
import { toUnaccentName } from "@/utils/helpers";
import { useEffect, useState } from "react";
import provinceServices from "@/services/province";
import { useSearchParams } from "next/navigation";

type Props = {
  form: UseFormReturn<FindChurchFormValues, any, undefined>;
  field: ControllerRenderProps<FindChurchFormValues, "province">;
};

export function ProvinceCombobox({ form, field }: Props) {
  const [provinces, setProvinces] = useState<Province[]>([]);

  const searchParams = useSearchParams();
  const provinceParam = searchParams.get("Param") || "";

  const handleFilter = (id: string, search: string) => {
    const extendValue = provinces.find((p) => p.slug === id)?.unaccent_name;
    const extendSearch = toUnaccentName(search);

    if (extendValue?.includes(extendSearch)) return 1;
    return 0;
  };

  useEffect(() => {
    if (provinceParam) {
      form.setValue("province", provinceParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceParam]);

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
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "sm:w-[200px] justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? provinces.find((province) => province.slug === field.value)
                  ?.name
              : "Chọn tỉnh thành"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="sm:w-[200px] p-0">
        <Command filter={handleFilter}>
          <CommandInput placeholder="Tìm tỉnh thành..." className="h-9" />
          <CommandEmpty>Không tìm thấy tỉnh thành.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                value={""}
                onSelect={() => {
                  form.setValue("province", "");
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
              {provinces?.map((province) => (
                <CommandItem
                  value={province.slug}
                  key={province.slug}
                  onSelect={() => {
                    form.setValue("province", province.slug);
                  }}
                >
                  {province.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      province.slug === field.value
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
