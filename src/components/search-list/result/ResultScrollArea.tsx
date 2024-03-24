"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListPageContext } from "@/context/list-page-context";
import { useIsClient } from "@/hooks/useIsClient";
import { useQueryString } from "@/hooks/useQueryString";
import { Church, ChurchPagination } from "@/schema/church";
import appServices from "@/services/app";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
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

  // Scroll to loading
  const handleGetNextPage = useCallback(async () => {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    debounce.current = setTimeout(async () => {
      if (!churches || !churches.next_page_url) return;

      const regex = /(?:\/search\?)(?<page>.*)/;
      const pageParam =
        churches?.next_page_url?.match(regex)?.groups?.page || null;

      if (!pageParam) return;

      const response = await appServices.search(queryString + "&" + pageParam);

      if (response) {
        const newData = churches.data;
        newData.push(...response.data);
        response.data = newData;
        setChurches(response);
      }
    }, 500);
  }, [churches, queryString, setChurches]);

  return (
    <ScrollArea
      className="grow max-h-[700px] h-[90svh]"
      onScrollCapture={handleScroll}
    >
      <div className="divide-y" ref={listDivRef}>
        {!isLoading && churches && (
          <ResultItems
            churches={churches.data}
            onSelectChurch={handleSelectChurch}
          />
        )}
        {(isLoading || churches?.next_page_url) && (
          <Button ref={seeMoreBtnRef} variant={"ghost"} className="w-full py-6">
            Đang tải...
          </Button>
        )}
      </div>
    </ScrollArea>
  );
};
