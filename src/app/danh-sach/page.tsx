import { FindChurchFormValues } from "@/components/pages/searchList/components/form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import appServices from "@/services/app";
import { ChurchList } from "@/types/church";
import { InfoCircledIcon, SewingPinIcon } from "@radix-ui/react-icons";

type Props = {
  searchParams?: FindChurchFormValues;
};

export default async function ListPage({ searchParams }: Props) {
  let churches: ChurchList = {
    total: 0,
    per_page: 0,
    current_page: 0,
    last_page: 0,
    first_page_url: "",
    last_page_url: "",
    next_page_url: "",
    prev_page_url: "",
    path: "",
    from: 0,
    to: 0,
    data: [],
  };

  if (searchParams) {
    const values: FindChurchFormValues = searchParams;
    // Remove key has empty value
    let o = Object.fromEntries(Object.entries(values).filter(([_, v]) => !!v));
    const queryString = new URLSearchParams(o).toString();
    const results = await appServices.search(queryString);
    if (results) {
      churches = results;
    }
  }

  return (
    <>
      <div className="">
        <div className="title">
          <p className="mb-4 text-xl font-bold">
            {churches.total} kết quả được tìm thấy
          </p>
        </div>
        <ScrollArea className="grow max-h-[700px] h-[90svh]">
          <div className="divide-y">
            {(churches.data || []).map((church, index) => (
              <div key={church.id} className="item py-4">
                <h3 className="text-lg font-bold">{church.name}</h3>
                <p className="text-sm text-gray-500">{church.address}</p>
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
