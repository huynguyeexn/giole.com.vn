"use client";
import { SearchFormComponent } from "@/components/search-list/form";
import MapBoxComponent from "@/components/search-list/mapbox";
import ListPageContextProvider from "@/context/list-page-context";
import { useFormDefaultValues } from "@/hooks/useFormDefaultValues";
import { useIsClient } from "@/hooks/useIsClient";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export const SearchPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isClient = useIsClient();
  const formDefaultValues = useFormDefaultValues();

  return (
    <ListPageContextProvider
      initValues={{
        formInput: formDefaultValues,
      }}
    >
      <main className="container text-sky-950 pb-8">
        <search className="rounded-3xl mb-8">
          <Suspense>
            <SearchFormComponent />
          </Suspense>
        </search>
        <article className="result-box">
          <div className="space-x-8 grid sm:grid-cols-2">
            {/* RESULT LIST */}
            {children}

            {/* MapBox */}
            {isClient && <MapBoxComponent />}
          </div>
        </article>
      </main>
    </ListPageContextProvider>
  );
};
