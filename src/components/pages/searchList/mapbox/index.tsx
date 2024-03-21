"use client";
import React, { memo } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import MapWrapperComponent from "./mapWrapper";

const MapBoxComponent = memo(function MapBoxComponent() {
  const isClient = useIsClient();

  // Render MapWrapperComponent if on client side, otherwise return null
  return isClient ? <MapWrapperComponent /> : null;
});

export default MapBoxComponent;
