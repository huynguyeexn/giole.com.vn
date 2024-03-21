"use client";
import ListFormFilter from "@/components/pages/searchList/form";
import MapBoxComponent from "@/components/pages/searchList/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Suspense } from "react";
import ChurchListContextProvider from "../../context/churchListContext";

export default function ListPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChurchListContextProvider>
      <main className="container text-sky-950 pb-8">
        <section className="rounded-3xl mb-8">
          <Suspense>
            <ListFormFilter />
          </Suspense>
        </section>
        <section className="result-box">
          <div className="space-x-8 grid sm:grid-cols-2">
            {/* RESULT LIST */}
            {children}
            <MapBoxComponent />
          </div>
        </section>
      </main>
    </ChurchListContextProvider>
  );
}
