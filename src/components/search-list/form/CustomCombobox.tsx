"use client";
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
import { FormTypes } from "@/form-schema/list-page-search-form";
import { cn } from "@/lib/utils";
import { District } from "@/types/district";
import { Province } from "@/types/province";
import { mapDivisionType, toUnaccentName } from "@/utils/helpers";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useCallback, useMemo } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

type CustomComboboxProps = {
  name: "district" | "province";
  placeholder: string;
  form: UseFormReturn<FormTypes, any, undefined>;
  field:
    | ControllerRenderProps<FormTypes, "district">
    | ControllerRenderProps<FormTypes, "province">;
  data: Province[] | District[];
};

export const CustomCombobox = ({
  name,
  placeholder,
  form,
  field,
  data,
}: CustomComboboxProps) => {
  const handleFilter = (id: string, search: string) => {
    const extendValue = data.find((item) => item.slug === id)?.unaccent_name;
    const extendSearch = toUnaccentName(search);

    if (extendValue?.includes(extendSearch)) return 1;
    return 0;
  };

  const buttonStyle = cn(
    "w-full sm:w-[200px] justify-between",
    !field.value && "text-muted-foreground"
  );

  const renderSelectValueString = useMemo(() => {
    return field.value
      ? data.find((item) => item.slug === field.value)?.name
      : `Chọn ${placeholder}`;
  }, [data, field.value, placeholder]);

  const renderCheckIcon = useCallback(
    (value: string) => {
      return (
        <CheckIcon
          className={cn(
            "ml-auto h-4 w-4",
            field.value == value ? "opacity-100" : "opacity-0"
          )}
        />
      );
    },
    [field.value]
  );

  const handleCommandSelect = useCallback(
    (value: string) => {
      if (name === "province") {
        form.setValue("district", "");
      }

      form.setValue(name, value, { shouldValidate: true });
    },
    [form, name]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button variant="outline" role="combobox" className={buttonStyle}>
            {renderSelectValueString}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="sm:w-[200px] p-0">
        <Command filter={handleFilter}>
          <CommandInput placeholder={`Tìm ${placeholder}...`} className="h-9" />
          <CommandEmpty>Không tìm thấy {placeholder}.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem value={""} onSelect={() => handleCommandSelect("")}>
                Tất cả
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    "" === field.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              {data?.map((item) => (
                <CommandItem
                  value={item.slug}
                  key={item.slug}
                  onSelect={() => handleCommandSelect(item.slug)}
                >
                  {mapDivisionType(item.name, item.division_type)}
                  {renderCheckIcon(item.slug)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
