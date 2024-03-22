"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListPageContext } from "@/context/list-page-context";
import { useIsClient } from "@/hooks/useIsClient";
import { useQueryString } from "@/hooks/useQueryString";
import appServices from "@/services/app";
import { Church, ChurchList } from "@/types/church";
import { mapAddress, mapChurchType } from "@/utils/helpers";
import { ReloadIcon, SewingPinIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ResultListComponentProps = {
  initChurches: ChurchList;
};

export const ResultListComponent = ({
  initChurches,
}: ResultListComponentProps) => {
  const debounce = useRef<any>(null);
  const seeMoreBtnRef = useRef<HTMLButtonElement>(null);

  const { state, actions } = useContext(ListPageContext);
  const [churches, setChurches] = useState(initChurches);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const isClient = useIsClient();
  const queryString = useQueryString({ params });

  console.log(params);

  const screenHeight = useMemo(
    () => (isClient ? document.body.clientHeight : null),
    [isClient]
  );

  const handleSelectChurch = (church: Church) => {
    actions.selectChurch(church);
  };

  useEffect(() => {
    const search = async () => {
      const response = await appServices.search(queryString);

      if (response) {
        setChurches(response);
      }
      setLoading(false);
    };
    setLoading(true);
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  const handleScroll = () => {
    if (!screenHeight) return;

    const buttonPosition =
      seeMoreBtnRef.current?.getBoundingClientRect()?.top || null;
    if (!buttonPosition) return;

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
  }, [churches, queryString]);

  return (
    <>
      <section className="relative">
        <header className="title">
          <p className="mb-4 text-xl font-bold flex items-center">
            {loading ? (
              <ReloadIcon className="animate-spin mr-1" />
            ) : (
              churches.total || 0
            )}{" "}
            kết quả được tìm thấy
          </p>
        </header>
        <ScrollArea
          className="grow max-h-[700px] h-[90svh]"
          onScrollCapture={handleScroll}
        >
          <div className="divide-y">
            {!loading && (
              <ResultItems
                churches={churches.data}
                onSelectChurch={handleSelectChurch}
              />
            )}
            {churches.next_page_url && (
              <Button
                ref={seeMoreBtnRef}
                variant={"ghost"}
                className="w-full py-6"
              >
                Đang tải...
              </Button>
            )}
          </div>
        </ScrollArea>
      </section>
    </>
  );
};

type ResultItemsProps = {
  churches: Church[];
  onSelectChurch: (church: Church) => void;
};

const ResultItems = ({ churches, onSelectChurch }: ResultItemsProps) => {
  return (
    <>
      {(churches || []).map((church, index) => (
        <figure key={`${church.id}${index}`} className="item py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">
              {mapChurchType(church.name, church.type)}
            </h3>
            <span className="text-gray-200">#{index + 1}</span>
          </div>
          <p className="text-sm text-gray-500">{mapAddress(church)}</p>
          <ul className="my-2 space-y-1">
            <li>
              <p>Ngày thường: {church.normal_day}</p>
            </li>
            <li>
              <p>Thứ bảy: {church.saturday}</p>
            </li>
            <li>
              <p>Chúa Nhật: {church.sunday}</p>
            </li>
          </ul>
          <div className="space-x-2">
            <Button variant={"outline"} onClick={() => onSelectChurch(church)}>
              <SewingPinIcon className="mr-2 h-4 w-4" />
              Xem trên bản đồ
            </Button>
            {/* TODO */}
            {/* <Button variant={"ghost"}>
              <InfoCircledIcon className="mr-2 h-4 w-4" />
              Góp ý
            </Button> */}
          </div>
        </figure>
      ))}
    </>
  );
};
