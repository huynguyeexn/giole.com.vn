import SearchBoxComponent from "@/components/pages/home/searchBox";
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
          <SearchBoxComponent />
        </div>
      </section>
    </main>
  );
}
