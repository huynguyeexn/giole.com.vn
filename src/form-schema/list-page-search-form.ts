import { z } from "zod";
import { searchFormFields } from "./search-form";
const { churchName } = searchFormFields;

export const FormSchema = z.object({
  churchName: z
    .string({
      required_error: "Vui lòng nhập tên nhà thờ cần tìm.",
    })
    .trim()
    .min(churchName.min, {
      message: `Tên nhà thờ phải nhiều hơn ${churchName.min} ký tự.`,
    })
    .max(churchName.max, {
      message: `Tên nhà thờ không được dài quá ${churchName.max} ký tự.`,
    })
    .regex(churchName.regex, {
      message: "Tên nhà thờ chỉ được nhập số hoặc chữ cái.",
    })
    .optional()
    .or(z.literal("")),
  province: z.string().optional(),
  district: z.string().optional(),
});

export type FormTypes = z.infer<typeof FormSchema>;

export const FormDefaultValues: Partial<FormTypes> = {
  churchName: "",
  province: "",
  district: "",
};
