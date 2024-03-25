"use client";
import { ListPageContext } from "@/context/list-page-context";
import { ChurchPagination } from "@/schema/church";
import { ReloadIcon } from "@radix-ui/react-icons";
import { memo, useContext, useEffect, useState } from "react";
import { ResultScrollArea } from "./ResultScrollArea";

type ResultListComponentProps = {
  churches?: ChurchPagination;
};

export const ResultListComponent = memo(function ResultListComponent({
  churches: churchesProp,
}: ResultListComponentProps) {
  const { state } = useContext(ListPageContext);
  const { isLoading, churchResultList } = state;

  const [churches, setChurches] = useState(churchResultList);

  useEffect(() => {
    setChurches(churchResultList);
  }, [churchResultList]);

  return (
    <>
      <section className="relative">
        <header className="title">
          <p className="mb-4 text-xl font-bold flex items-center">
            {!isLoading ? (
              churchesProp?.total || churches?.total || 0
            ) : (
              <ReloadIcon className="animate-spin mr-1" />
            )}{" "}
            kết quả được tìm thấy
          </p>
        </header>
        <ResultScrollArea
          churches={churchesProp || churches}
          setChurches={setChurches}
        />
      </section>
    </>
  );
});
