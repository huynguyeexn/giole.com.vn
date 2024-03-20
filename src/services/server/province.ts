"use server";
import { cache } from "react";

export const cacheGetAllProvinces = async () => {
  const response = await fetch(
    "https://3000.saturnus.site/api/v2/provinces/all",
    { method: "GET", cache: "force-cache", next: { revalidate: 360000 } }
  );
  const result = await response.json();
  return result;
};
