import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  InfoCircledIcon,
  ReloadIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";
import "mapbox-gl/dist/mapbox-gl.css";
import { Suspense, lazy } from "react";
import ListFormFilter from "./components/form";
const MapBoxComponent = lazy(() => import("./components/mapbox"));

export default function ListPage() {
  return (
    <main className="container text-sky-950 pb-8">
      <section className="rounded-3xl mb-8">
        <ListFormFilter />
      </section>
      <section className="result-box">
        <div className="title">
          <p className="mb-4 text-xl font-bold">10 kết quả được tìm thấy</p>
        </div>
        <div className="space-x-8 grid sm:grid-cols-2">
          <ScrollArea className="grow max-h-[700px] h-[90svh]">
            <div className="divide-y">
              {Array(10)
                .fill("")
                .map((item, index) => (
                  <div key={index} className="item py-4">
                    <h3 className="text-lg font-bold">Nhà thờ An Bình</h3>
                    <p className="text-sm text-gray-500">
                      04 An Bình, Quận 5, Thành phố Hồ Chí Minh
                    </p>
                    <ul className="my-2 space-y-1">
                      <li>
                        <p>Ngày thường: 05:30, 18:00</p>
                      </li>
                      <li>
                        <p>Thứ Bảy: 05:30, 18:00</p>
                      </li>
                      <li>
                        <p>
                          Chúa Nhật: 06:00, 07:30 (tiếng Hoa), 09:00 (lễ Thiếu
                          nhi), 17:30
                        </p>
                      </li>
                    </ul>
                    <div className="space-x-2">
                      <Button variant={"outline"}>
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
              <Button variant={"ghost"} className="w-full py-6">
                Xem thêm
              </Button>
            </div>
          </ScrollArea>

          {/* MAPBOX */}
          <div className="hidden sm:block grow rounded-3xl bg-sky-50 overflow-hidden h-[700px]">
            <Suspense
              fallback={
                <div className="h-full w-full flex justify-center items-center">
                  <ReloadIcon className="animate-spin text-sky-700 h-6 w-6" />
                </div>
              }
            >
              <MapBoxComponent />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
