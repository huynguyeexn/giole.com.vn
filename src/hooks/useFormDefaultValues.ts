import { useParams, useSearchParams } from "next/navigation";

export function useFormDefaultValues() {
  const params = useParams();
  const searchParams = useSearchParams();

  const provinceParam = (params["province"] || "") as string;
  const churchNameParams = (params["churchName"] || "") as string;

  const churchName =
    decodeURI(churchNameParams) || searchParams.get("churchName") || "";
  const province = provinceParam || searchParams.get("province") || "";
  const district = searchParams.get("district") || "";

  return {
    churchName,
    province,
    district,
  };
}
