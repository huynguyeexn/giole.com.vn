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
import { ListPageContext } from "@/context/list-page-context";
import { FormSchema, FormTypes } from "@/form-schema/list-page-search-form";
import { useFormDefaultValues } from "@/hooks/useFormDefaultValues";
import { useQueryString } from "@/hooks/useQueryString";
import { toQueryString } from "@/utils/helpers";
import { memo, useCallback, useContext, useEffect, useRef } from "react";

export const SearchFormComponent = memo(function SearchFormComponent() {
  const debounce = useRef<any>(null);
  const queryString = useQueryString();
  const formDefaultValues = useFormDefaultValues();
  const { actions } = useContext(ListPageContext);

  const form = useForm<FormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: formDefaultValues,
    shouldFocusError: false,
    mode: "onChange",
  });

  const churchName = form.watch("churchName");
  const province = form.watch("province");
  const district = form.watch("district");

  const handleSubmitForm = useCallback(() => {
    const formValues = form.getValues();
    const newQueryString = toQueryString(formValues);

    console.log("newQueryString", newQueryString);
    console.log("queryString", queryString);

    if (newQueryString === queryString) return;
    if (form.getFieldState("churchName").invalid) return;
    actions.setFormInput(formValues);
  }, [actions, form, queryString]);

  useEffect(() => {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    debounce.current = setTimeout(() => {
      handleSubmitForm();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [churchName]);

  useEffect(() => {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    handleSubmitForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province, district]);

  const handleResetForm = () => {
    form.setValue("churchName", "");
    form.setValue("district", "");
    form.setValue("province", "");
    handleSubmitForm();
  };

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 sm:items-end sm:justify-between">
          <ChurchNameInput form={form} />
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 grow sm:grow-0 mb-4 sm:mb-0">
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
