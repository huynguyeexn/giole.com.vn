"use client";
import React from "react";
import { useIsClient } from "@/hooks/useIsClient";
import MapWrapperComponent from "./mapWrapper";

const MapBoxComponent: React.FC = () => {
  const isClient = useIsClient();

  // Render MapWrapperComponent if on client side, otherwise return null
  return isClient ? <MapWrapperComponent /> : null;
};

export default MapBoxComponent;
