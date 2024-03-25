"use client";
import { ResultListComponent } from "@/components/search-list/result";
import { ListPageContext } from "@/context/list-page-context";
import { useQueryString } from "@/hooks/useQueryString";
import appServices from "@/services/app";
import { toQueryString } from "@/utils/helpers";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useContext, useEffect } from "react";

export default function ListPageComponent() {
  const { state, actions } = useContext(ListPageContext);
  const queryString = useQueryString();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const search = async () => {
      actions.setLoading(true);
      const formValues = state.formInput;
      const params = toQueryString(formValues);

      const response = await appServices.search(params);
      if (response) {
        actions.setChurchResultList(response);
        actions.setLoading(false);
      }
    };
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  useEffect(() => {
    const formValues = state.formInput;
    const newQueryString = toQueryString(formValues);
    if (newQueryString === queryString) return;

    const params = toQueryString(formValues);
    const url = `${pathname}/?${params}`;
    router.push(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.formInput]);

  return (
    <Suspense>
      <ResultListComponent />
    </Suspense>
  );
}
