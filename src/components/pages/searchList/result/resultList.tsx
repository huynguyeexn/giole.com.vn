"use client";

import { ChurchListContext } from "@/context/churchListContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import appServices from "@/services/app";
import { Church, ChurchList } from "@/types/church";
import { mapAddress, mapChurchType } from "@/utils/helpers";
import {
  InfoCircledIcon,
  ReloadIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import {
  LegacyRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useIsClient } from "@/hooks/useIsClient";

type Props = {
  initChurches: ChurchList;
};

export default function ResultListComponent({ initChurches }: Props) {
  const debounce = useRef<any>(null);
  const { state, actions } = useContext(ChurchListContext);
  const [churches, setChurches] = useState(initChurches);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const isClient = useIsClient();
  const allParams = useMemo(
    () => ({
      churchName: searchParams.get("churchName") || "",
      province: searchParams.get("province") || "",
      district: searchParams.get("province")
        ? searchParams.get("district") || ""
        : "",
    }),
    [searchParams]
  );

  const screenHeight = useMemo(
    () => (isClient ? document.body.clientHeight : null),
    [isClient]
  );

  const handleSelectChurch = (church: Church) => {
    console.log("handleSelectChurch", church);

    actions.selectChurch(church);
  };

  useEffect(() => {
    let o = Object.fromEntries(
      Object.entries(allParams).filter(([_, v]) => !!v)
    );
    const queryString = new URLSearchParams(o).toString();
    const search = async () => {
      setLoading(true);
      const response = await appServices.search(queryString);
      if (response) {
        console.log(response);

        setChurches(response);
      }
      setLoading(false);
    };
    search();
  }, [allParams]);

  const seeMoreBtnRef = useRef<HTMLButtonElement>(null);

  const handleScroll = () => {
    if (!screenHeight) return;

    const buttonPosition =
      seeMoreBtnRef.current?.getBoundingClientRect()?.top || null;
    if (!buttonPosition) return;

    if (buttonPosition < screenHeight) {
      handleGetNextPage();
    }
  };

  const handleGetNextPage = useCallback(async () => {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    debounce.current = setTimeout(async () => {
      if (!churches || !churches.next_page_url) return;

      const regex = /(?:\/search\?)(?<param>.*)/;
      const queryString =
        churches?.next_page_url?.match(regex)?.groups?.param || null;

      if (!queryString) return;

      let o = Object.fromEntries(
        Object.entries(allParams).filter(([_, v]) => !!v)
      );
      const searchParams = new URLSearchParams(o).toString();

      const response = await appServices.search(
        searchParams + "&" + queryString
      );
      if (response) {
        const newData = churches.data;
        newData.push(...response.data);
        response.data = newData;
        setChurches(response);
        console.log("newData", response);
      }
    }, 500);
  }, [churches, allParams]);

  return (
    <>
      <div className="relative">
        <div className="title">
          <p className="mb-4 text-xl font-bold flex items-center">
            {loading ? (
              <ReloadIcon className="animate-spin mr-1" />
            ) : (
              churches.total || 0
            )}{" "}
            kết quả được tìm thấy
          </p>
        </div>
        <ScrollArea
          className="grow max-h-[700px] h-[90svh]"
          onScrollCapture={handleScroll}
        >
          <div className="divide-y">
            {(churches.data || []).map((church, index) => (
              <div key={`${church.id}${index}`} className="item py-4">
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
                  <Button
                    variant={"outline"}
                    onClick={() => handleSelectChurch(church)}
                  >
                    <SewingPinIcon className="mr-2 h-4 w-4" />
                    Xem trên bản đồ
                  </Button>
                  <Button variant={"ghost"}>
                    <InfoCircledIcon className="mr-2 h-4 w-4" />
                    Góp ý
                  </Button>
                </div>
              </div>
            ))}
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
      </div>
    </>
  );
}
