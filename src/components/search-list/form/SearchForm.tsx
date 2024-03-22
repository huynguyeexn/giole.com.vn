"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { FiltersComponent } from "./FiltersComponent";

import { FormSchema, FormTypes } from "@/form-schema/list-page-search-form";
import { useQueryString } from "@/hooks/useQueryString";
import { toQueryString } from "@/utils/helpers";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { memo, useEffect, useRef } from "react";

export const SearchFormComponent = memo(function SearchFormComponent() {
  const debounce = useRef<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  const paramChurchName = params?.churchName
    ? decodeURI(params.churchName as string)
    : "";
  const paramProvince = params?.province ? (params.province as string) : "";
  const paramDistrict = params?.district ? (params.district as string) : "";

  const churchNameParam =
    paramChurchName || searchParams.get("churchName") || "";
  const provinceParam = paramProvince || searchParams.get("province") || "";
  const districtParam = paramDistrict || searchParams.get("district") || "";
  const queryString = useQueryString(params);

  const formDefaultValues = {
    churchName: churchNameParam,
    province: provinceParam,
    district: districtParam,
  };

  const form = useForm<FormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: formDefaultValues,
    shouldFocusError: false,
    mode: "onChange",
  });

  const watchForm = form.watch();

  useEffect(() => {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    debounce.current = setTimeout(() => {
      const newQueryString = toQueryString(watchForm);
      if (newQueryString === queryString) return;
      if (!form.getFieldState("churchName").invalid) {
        const url = `${pathname}/?${newQueryString}`;
        router.push(url);
      }
      // }
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchForm]);

  const handleResetForm = () => {
    form.setValue("churchName", paramChurchName || "");
    form.setValue("district", paramDistrict || "");
    form.setValue("province", paramProvince || "");
    router.push(pathname + "/?" + toQueryString(form.getValues()));
  };

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 sm:items-end sm:justify-between">
          <ChurchNameInput form={form} />
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 grow sm:grow-0">
            <FiltersComponent form={form} />
          </div>
          <div>
            <Button
              className="px-0"
              type="button"
              variant={"link"}
              onClick={handleResetForm}
            >
              Xoá bộ lọc
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
});

const ChurchNameInput = ({
  form,
}: {
  form: UseFormReturn<FormTypes, any, undefined>;
}) => {
  return (
    <FormField
      control={form.control}
      name="churchName"
      render={({ field }) => (
        <FormItem className="grow relative">
          <FormLabel>Tên nhà thờ</FormLabel>
          <FormControl>
            <Input
              className="bg-white text-sky-950"
              placeholder="Nhập tên nhà thờ (Ví dụ: ba chuông)"
              {...field}
            />
          </FormControl>
          <div className="absolute -bottom-6 left-0">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
