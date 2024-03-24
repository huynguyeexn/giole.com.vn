"use client";
import { Button } from "@/components/ui/button";
import { Church } from "@/schema/church";
import { mapAddress, mapChurchType } from "@/utils/helpers";
import { SewingPinIcon } from "@radix-ui/react-icons";

type ResultItemsProps = {
  churches: Church[];
  onSelectChurch: (church: Church) => void;
};

export const ResultItems = ({ churches, onSelectChurch }: ResultItemsProps) => {
  return (
    <>
      {(churches || []).map((church, index) => (
        <figure key={`${church.id}${index}`} className="item py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">
              {mapChurchType(church.name, church.type)}
            </h3>
            <span className="text-gray-200 pr-4">#{index + 1}</span>
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
