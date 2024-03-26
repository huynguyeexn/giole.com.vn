import { HeroComponent, SearchBoxComponent } from "@/components/home";
import styles from "@/styles/home-page.module.scss";
import { clsx } from "clsx";

export default function Home() {
  const articleStyle = clsx(
    "rounded-3xl bg-cyan-100 sm:p-10 relative ",
    styles.homeBanner
  );

  return (
    <main className="p-4 sm:container text-sky-950 pb-8 mt-4">
      <article className={articleStyle}>
        <section className="bg-sky-50/50 sm:bg-transparent backdrop-blur-[2px] sm:backdrop-blur-none p-5 rounded-3xl">
          <div className="w-full md:w-1/2">
            <HeroComponent />
          </div>
          <div className="form-wrapper mt-10 sm:mt-20">
            <SearchBoxComponent />
          </div>
        </section>
      </article>
    </main>
  );
}
