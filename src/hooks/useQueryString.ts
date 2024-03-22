import { toQueryString } from "@/utils/helpers";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function useQueryString() {
  const searchParams = useSearchParams();
  const allParams = useMemo(() => {
    return toQueryString({
      churchName: searchParams.get("churchName") || "",
      province: searchParams.get("province") || "",
      district: searchParams.get("province")
        ? searchParams.get("district") || ""
        : "",
    });
  }, [searchParams]);

  const [queryString, setQueryString] = useState(allParams);

  useEffect(() => {
    console.log("setQueryString", allParams);
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
