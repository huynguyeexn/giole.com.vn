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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import ComboboxWrapperComponent from "./comboboxWrapper";

const FindChurchFormSchema = z.object({
  churchName: z
    .string()
    .trim()
    .min(3, {
      message: "Tên nhà thờ phải nhiều hơn 3 ký tự.",
    })
    .max(50, {
      message: "Tên nhà thờ không được dài quá 50 ký tự.",
    })
    .regex(/^[\p{L}\p{M}\w ]+$/u, {
      message: "Tên nhà thờ chỉ được nhập số hoặc chữ cái.",
    })
    .optional()
    .or(z.literal("")),
  province: z.string().optional(),
  district: z.string().optional(),
});

export type FindChurchFormValues = z.infer<typeof FindChurchFormSchema>;

export default function ListFormFilter() {
  const debounce = useRef<any>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const churchNameParam = searchParams.get("churchName") || "";
  const provinceParam = searchParams.get("province") || "";
  const districtParam = provinceParam ? searchParams.get("district") || "" : "";

  const form = useForm<FindChurchFormValues>({
    resolver: zodResolver(FindChurchFormSchema),
    defaultValues: {
      churchName: churchNameParam,
      province: provinceParam,
      district: districtParam,
    },
    shouldFocusError: false,
    mode: "onChange",
  });

  const province = useWatch({
    control: form.control,
    name: "province",
  });
  const district = useWatch({
    control: form.control,
    name: "district",
  });

  const [formValues, setFormValues] = useState(
    JSON.stringify(form.getValues())
  );

  const handleResetForm = () => {
    router.push(pathname);
    form.setValue("churchName", "");
    form.setValue("district", "");
    form.setValue("province", "");
  };

  const onChangeForm = useCallback(
    (values: FindChurchFormValues) => {
      if (debounce.current) {
        clearTimeout(debounce.current);
      }

      debounce.current = setTimeout(() => {
        setFormValues(JSON.stringify(values));
      }, 1000);
    },
    [setFormValues]
  );

  useEffect(() => {
    if (churchNameParam) {
      form.setValue("churchName", churchNameParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [churchNameParam]);

  useEffect(() => {
    if (form.getValues().district || form.getValues().province) {
      setFormValues(JSON.stringify(form.getValues()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province, district]);

  useEffect(() => {
    const values: FindChurchFormValues = JSON.parse(formValues);

    // Remove key has empty value
    let o = Object.fromEntries(Object.entries(values).filter(([_, v]) => !!v));

    const queryString = new URLSearchParams(o).toString();

    const url = `${pathname}/?${queryString}`;
    router.push(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onChangeForm)} className="space-y-4">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 sm:items-end sm:justify-between">
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
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 grow sm:grow-0">
            <ComboboxWrapperComponent form={form} />
          </div>
          <div className="">
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
}
