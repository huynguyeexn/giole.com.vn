import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListPageContext } from "@/context/list-page-context";
import { useQueryString } from "@/hooks/useQueryString";
import { Church, ChurchPagination } from "@/schema/church";
import appServices from "@/services/app";
import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { ResultItems } from "./ResultItems";

type ResultScrollAreaProps = {
  churches: ChurchPagination;
  setChurches: Dispatch<SetStateAction<ChurchPagination>>;
};

export const ResultScrollArea = ({
  churches,
  setChurches,
}: ResultScrollAreaProps) => {
  const throttled = useRef<any>(null);
  const listDivRef = useRef<HTMLDivElement>(null);
  const seeMoreBtnRef = useRef<HTMLButtonElement>(null);

  const queryString = useQueryString();
  const { state, actions } = useContext(ListPageContext);

  const { isLoading } = state;
  const isShowLoading = isLoading || churches.current_page < churches.last_page;
  const isShowResult = !isLoading && churches;

  const handleSelectChurch = (church: Church) => {
    actions.selectChurch(church);
  };

  const handleGetNextPage = async () => {
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
  };

  const handleLoadMore = () => {
    const now = Date.now();
    const interval = 1000;

    if (!throttled.current) {
      handleGetNextPage();
      throttled.current = now;
    } else {
      if (now >= throttled.current + interval) {
        handleGetNextPage();
        throttled.current = now;
      }
    }
  };

  const handleScroll = () => {
    const windowHeight = window.screen.height;
    const buttonPosition =
      seeMoreBtnRef.current?.getBoundingClientRect()?.top || null;

    if (!windowHeight || !buttonPosition) {
      return;
    }

    if (buttonPosition < windowHeight * 2) {
      handleLoadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [churches.current_page]);

  return (
    <ScrollArea
      onScrollCapture={handleScroll}
      className="grow h-auto sm:max-h-[700px] sm:h-[90svh]"
    >
      <div className="divide-y" ref={listDivRef}>
        {isShowResult && (
          <ResultItems
            churches={churches.data}
            onSelectChurch={handleSelectChurch}
          />
        )}
        {isShowLoading && (
          <Button
            title="Đang tải"
            ref={seeMoreBtnRef}
            variant={"ghost"}
            className="w-full py-6"
          >
            Đang tải...
          </Button>
        )}
      </div>
    </ScrollArea>
  );
};
