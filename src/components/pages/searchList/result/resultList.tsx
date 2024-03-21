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
import { useContext, useEffect, useMemo, useState } from "react";

type Props = {
  initChurches: ChurchList;
};

export default function ResultListComponent({ initChurches }: Props) {
  const { state, actions } = useContext(ChurchListContext);
  const [churches, setChurches] = useState(initChurches);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
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
        setChurches(response);
      }
      setLoading(false);
    };
    search();
  }, [allParams]);

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
        <ScrollArea className="grow max-h-[700px] h-[90svh]">
          <div className="divide-y">
            {(churches.data || []).map((church, index) => (
              <div key={church.id} className="item py-4">
                <h3 className="text-lg font-bold">
                  {mapChurchType(church.name, church.type)}
                </h3>
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
              <Button variant={"ghost"} className="w-full py-6">
                Xem thêm
              </Button>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
