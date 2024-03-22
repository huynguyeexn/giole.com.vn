"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { UseFormReturn, useForm } from "react-hook-form";

import {
  FormSchema,
  FormTypes,
  FormDefaultValues as defaultValues,
} from "@/form-schema/home-page-search-form";

import RouteLinks from "@/utils/routes";

export function SearchBoxComponent() {
  const router = useRouter();

  const form = useForm<FormTypes>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues,
  });

  function handleSubmit(data: FormTypes) {
    const url = `${RouteLinks.ListPage}?churchName=${data.churchName}`;
    router.push(url);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="form-title w-fit py-2 px-4 rounded-tl-2xl rounded-tr-2xl bg-white">
          <span className="font-bold">Tên nhà thờ</span>
        </div>
        <div className="w-full md:w-3/4 lg:2/3 backdrop-blur bg-white/50 rounded-e-2xl rounded-bl-2xl p-4 flex items-start space-x-4">
          <div className="grow">
            <ChurchNameInput form={form} />
          </div>
          <div>
            <Button type="submit">Tìm kiếm</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

const ChurchNameInput = ({
  form,
}: {
  form: UseFormReturn<FormTypes, any, undefined>;
}) => {
  return (
    <FormField
      control={form.control}
      name={"churchName"}
      render={({ field }) => (
        <FormItem className="grow relative">
          <FormControl>
            <Input
              className="border border-gray-400"
              placeholder="Nhập tên nhà thờ (Ví dụ: Ba Chuông)"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
