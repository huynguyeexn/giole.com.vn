import { useSearchParams } from "next/navigation";

export function useFormDefaultValues() {
  const searchParams = useSearchParams();

  const churchName = searchParams.get("churchName") || "";
  const province = searchParams.get("province") || "";
  const district = searchParams.get("district") || "";

  return {
    churchName,
    province,
    district,
  };
}
