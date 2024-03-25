"use client";
import { ResultListComponent } from "@/components/search-list/result";
import { ListPageContext } from "@/context/list-page-context";
import { useQueryString } from "@/hooks/useQueryString";
import { ChurchPagination } from "@/schema/church";
import { toQueryString } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { Suspense, useContext, useEffect } from "react";

type ChurchByProvinceProps = {
  churches: ChurchPagination;
};

export default function ChurchByProvinceComponent({
  churches,
}: ChurchByProvinceProps) {
  const { state, actions } = useContext(ListPageContext);
  const queryString = useQueryString();
  const router = useRouter();

  useEffect(() => {
    actions.setChurchResultList(churches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [churches]);

  useEffect(() => {
    const formValues = state.formInput;
    const newQueryString = toQueryString(formValues);
    if (newQueryString === queryString) return;

    const params = toQueryString(formValues);
    const url = `/danh-sach/?${params}`;
    router.push(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.formInput]);

  return (
    <Suspense>
      <ResultListComponent churches={churches} />
    </Suspense>
  );
}
