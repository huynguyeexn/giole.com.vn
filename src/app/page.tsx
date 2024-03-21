import SearchBoxComponent from "@/components/pages/home/searchBox";
import { clsx } from "clsx";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className="container text-sky-950 pb-8">
      <section
        className={clsx(
          "rounded-3xl bg-sky-200 sm:p-10 relative ",
          styles.homeBanner
        )}
      >
        <div className="bg-sky-50/50 sm:bg-transparent backdrop-blur-[2px] sm:backdrop-blur-none p-5 rounded-3xl">
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-16">
              Giờ lễ nhà thờ trên toàn quốc
            </h1>
            <p className="text-lg font-medium">
              Giole.com.vn là website chuyên cung cấp thông tin giờ lễ các nhà
              thờ, giáo xứ tại Việt Nam. Dữ liệu được thu thập từ nhiều nguồn
              khác nhau, và do cộng đoàn đóng góp. Thông tin có thể sai lệch so
              với thực tế. Kính mong cộng đoàn góp ý để thông tin được chuẩn
              xác.
            </p>
          </div>
          <div className="form-wrapper mt-20">
            <SearchBoxComponent />
          </div>
        </div>
      </section>
    </main>
  );
}
