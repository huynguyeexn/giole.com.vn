import { ReloadIcon } from "@radix-ui/react-icons";
import "mapbox-gl/dist/mapbox-gl.css";
import { Suspense, lazy } from "react";
import ListFormFilter from "../../components/pages/searchList/components/form";
const MapBoxComponent = lazy(
  () => import("../../components/pages/searchList/components/mapbox")
);

export default function ListPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="container text-sky-950 pb-8">
        <section className="rounded-3xl mb-8">
          <ListFormFilter />
        </section>
        <section className="result-box">
          <div className="space-x-8 grid sm:grid-cols-2">
            {/* RESULT LIST */}
            {children}

            {/* MAPBOX */}
            <div className="hidden sm:block grow rounded-3xl bg-sky-50 overflow-hidden h-full">
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
    </>
  );
}
