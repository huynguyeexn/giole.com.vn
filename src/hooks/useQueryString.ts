import { toQueryString } from "@/utils/helpers";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ParamType = {
  province?: string;
  churchName?: string;
};
export function useQueryString() {
  const params = useParams<ParamType>();
  const searchParams = useSearchParams();

  const churchNameParams = decodeURI(params.churchName || "") as string;
  const provinceParams = (params.province || "") as string;

  const allParams = useMemo(() => {
    let churchName = churchNameParams || searchParams.get("churchName") || "";
    let province = provinceParams || searchParams.get("province") || "";

    let district = searchParams.get("province")
      ? searchParams.get("district") || ""
      : "";

    return toQueryString({
      churchName,
      province,
      district,
    });
  }, [churchNameParams, provinceParams, searchParams]);

  const [queryString, setQueryString] = useState(allParams);

  useEffect(() => {
    setQueryString(allParams);
  }, [allParams]);

  return queryString;
}

export function getCurrentUrl() {
  return window.location.href.replace(window.location.origin, "");
}

export function isEqualCurrentRoute(value: string = "") {
  const currentUrl = window.location.href.replace(window.location.origin, "");
  return value === currentUrl;
}
