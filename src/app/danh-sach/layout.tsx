"use client";
import { SearchFormComponent } from "@/components/search-list/form";
import MapBoxComponent from "@/components/search-list/mapbox";
import ListPageContextProvider from "@/context/list-page-context";
import { useIsClient } from "@/hooks/useIsClient";
import { Suspense } from "react";

import "mapbox-gl/dist/mapbox-gl.css";

export default function ListPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isClient = useIsClient();

  return (
    <ListPageContextProvider>
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
}
