import { toQueryString } from "@/utils/helpers";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {
  params?: {
    province?: string;
    churchName?: string;
  };
};

export function useQueryString({ params = {} }: Props) {
  const searchParams = useSearchParams();

  const allParams = useMemo(() => {
    let churchName = searchParams.get("churchName") || "";
    let province = searchParams.get("province") || "";

    let district = searchParams.get("province")
      ? searchParams.get("district") || ""
      : "";

    if (params && params?.churchName) {
      churchName = decodeURI(params.churchName);
    }
    if (params && params?.province) {
      province = params.province;
    }

    return toQueryString({
      churchName,
      province,
      district,
    });
  }, [params, searchParams]);

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
