"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListPageContext } from "@/context/list-page-context";
import { useIsClient } from "@/hooks/useIsClient";
import { useQueryString } from "@/hooks/useQueryString";
import { Church, ChurchPagination } from "@/schema/church";
import appServices from "@/services/app";
import { Dispatch, SetStateAction, useContext, useMemo, useRef } from "react";
import { ResultItems } from "./ResultItems";

type ResultScrollAreaProps = {
  churches: ChurchPagination;
  setChurches: Dispatch<SetStateAction<ChurchPagination>>;
};

export const ResultScrollArea = ({
  churches,
  setChurches,
}: ResultScrollAreaProps) => {
  const debounce = useRef<any>(null);
  const seeMoreBtnRef = useRef<HTMLButtonElement>(null);
  const listDivRef = useRef<HTMLDivElement>(null);

  const { state, actions } = useContext(ListPageContext);
  const { isLoading } = state;

  const isClient = useIsClient();
  const queryString = useQueryString();

  const screenHeight = useMemo(
    () => (isClient ? document.body.clientHeight : null),
    [isClient]
  );

  const handleSelectChurch = (church: Church) => {
    actions.selectChurch(church);
  };
  const handleGetNextPage = async () => {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    debounce.current = setTimeout(async () => {
      if (!churches) return;
      if (churches.current_page >= churches.last_page) return;

      const nextPage = `&page=${churches.current_page + 1}`;
      const response = await appServices.search(`${queryString}${nextPage}`);
      if (response) {
        const newData = churches.data;
        newData.push(...response.data);
        response.data = newData;
        setChurches(response);
      }
    }, 500);
  };
  const handleScroll = () => {
    const buttonPosition =
      seeMoreBtnRef.current?.getBoundingClientRect()?.top || null;
    const divHeight = listDivRef.current?.clientHeight || null;

    if (
      !screenHeight ||
      !buttonPosition ||
      !divHeight ||
      divHeight < screenHeight
    )
      return;

    if (buttonPosition < screenHeight) {
      handleGetNextPage();
    }
  };

  const isShowLoading = isLoading || churches.current_page < churches.last_page;
  const isShowResult = !isLoading && churches;

  return (
    <ScrollArea
      className="grow max-h-[700px] h-[90svh]"
      onScrollCapture={handleScroll}
    >
      <div className="divide-y" ref={listDivRef}>
        {isShowResult && (
          <ResultItems
            churches={churches.data}
            onSelectChurch={handleSelectChurch}
          />
        )}
        {isShowLoading && (
          <Button ref={seeMoreBtnRef} variant={"ghost"} className="w-full py-6">
            Đang tải...
          </Button>
        )}
      </div>
    </ScrollArea>
  );
};
