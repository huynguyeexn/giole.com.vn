"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

const HomeSearchFromSchema = z.object({
  churchName: z
    .string({
      required_error: "Vui lòng nhập tên nhà thờ cần tìm.",
    })
    .trim()
    .min(3, {
      message: "Tên nhà thờ phải nhiều hơn 3 ký tự.",
    })
    .max(50, {
      message: "Tên nhà thờ không được dài quá 50 ký tự.",
    })
    .regex(/^[\p{L}\p{M}\w ]+$/u, {
      message: "Tên nhà thờ chỉ được nhập số hoặc chữ cái.",
    }),
});

export type HomeSearchFormTypes = z.infer<typeof HomeSearchFromSchema>;

const defaultValues: Partial<HomeSearchFormTypes> = {
  churchName: "",
};

export default function SearchBoxComponent() {
  const form = useForm<HomeSearchFormTypes>({
    resolver: zodResolver(HomeSearchFromSchema),
    mode: "onBlur",
    defaultValues,
  });

  const router = useRouter();

  function onSubmit(data: HomeSearchFormTypes) {
    const url = `/danh-sach/?churchName=${data.churchName}`;
    router.push(url);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="form-title w-fit py-2 px-4 rounded-tl-2xl rounded-tr-2xl bg-white">
          <span className="font-bold">Tên nhà thờ</span>
        </div>
        <div className="w-full md:w-3/4 lg:2/3 backdrop-blur bg-white/50 rounded-e-2xl rounded-bl-2xl p-4 flex items-start space-x-4">
          <div className="grow">
            <FormField
              control={form.control}
              name="churchName"
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
          </div>
          <div className="">
            <Button type="submit">Tìm kiếm</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
