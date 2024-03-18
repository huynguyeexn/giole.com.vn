import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className="container text-sky-950 pb-8">
      <section
        className={clsx(
          "rounded-3xl bg-sky-200 p-5 sm:pt-20 sm:p-10 relative",
          styles.homeBanner
        )}
      >
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-16">
            Giờ lễ nhà thờ trên toàn quốc
          </h1>
          <p className="text-lg font-medium">
            Giole.com.vn là website chuyên cung cấp thông tin giờ lễ các nhà
            thờ, giáo xứ tại Việt Nam. Cung cấp thông tin giờ lễ nhà thờ chính
            xác và cập nhật nhanh nhất.
          </p>
        </div>
        <div className="form-wrapper mt-20">
          <div className="form-title w-fit py-2 px-4 rounded-tl-2xl rounded-tr-2xl bg-white">
            <span className="font-bold">Tên nhà thờ</span>
          </div>
          <div className="w-full md:w-3/4 lg:2/3 backdrop-blur bg-white/50 rounded-e-2xl rounded-bl-2xl p-4 flex items-end space-x-4">
            <div className="grow">
              {/* <label className="mb-2 block">Tên nhà thờ</label> */}
              <Input
                className="border border-gray-400"
                placeholder="Nhập tên nhà thờ (Ví dụ: Nhà thờ Ba Chuông)"
              />
            </div>
            <div className="">
              <Button>Tìm kiếm</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
