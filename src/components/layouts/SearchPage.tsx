"use client";
import { SearchFormComponent } from "@/components/search-list/form";
import MapBoxComponent from "@/components/search-list/mapbox";
import ListPageContextProvider from "@/context/list-page-context";
import { useFormDefaultValues } from "@/hooks/useFormDefaultValues";
import { useIsClient } from "@/hooks/useIsClient";
import { Suspense } from "react";
import { Button } from "../ui/button";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import ScrollTop from "./ScrollTop";

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
      <main className="p-4 sm:container text-sky-950 sm:pb-8 relative">
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

        <ScrollTop />
      </main>
    </ListPageContextProvider>
  );
};
