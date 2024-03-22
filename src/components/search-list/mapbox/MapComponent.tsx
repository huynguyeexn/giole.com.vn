"use client";
import { ListPageContext } from "@/context/list-page-context";
import mapboxgl from "mapbox-gl";
import { useCallback, useContext, useEffect, useRef } from "react";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  useMap,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const mapboxKey = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

export default function MapComponent() {
  const { state } = useContext(ListPageContext);
  const churchSelected = state.churchSelected;
  return (
    <Map
      id="map"
      reuseMaps
      mapboxAccessToken={mapboxKey}
      initialViewState={{
        longitude: 107.5359134,
        latitude: 16.4534687,
        zoom: 5,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {churchSelected && <MapMarkerAndPopup />}
      <NavigationControl />
      <GeolocateControl />
    </Map>
  );
}

const MapMarkerAndPopup = () => {
  const { map } = useMap();
  const { state } = useContext(ListPageContext);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const churchSelected = state.churchSelected;

  useEffect(() => {
    if (!churchSelected || !map) return;
    const { lat, lng } = churchSelected;

    const popupHtml = `
    <div class="px-4">
      <p class="font-bold">Nhà thờ ${churchSelected.name}</p>
      <ul>
        <li>Ngày thường: ${churchSelected.normal_day}</li>
        <li>Thứ Bảy: ${churchSelected.saturday}</li>
        <li>Chúa Nhật: ${churchSelected.sunday}</li>
      </ul>
    </div>
    `;

    markerRef.current
      ?.setPopup(
        new mapboxgl.Popup({
          anchor: "bottom",
          offset: 25,
          closeButton: true,
          closeOnClick: true,
          closeOnMove: false,
          maxWidth: "300px",
          focusAfterOpen: false,
        }).setHTML(popupHtml)
      )
      .togglePopup();

    map.jumpTo({
      center: { lng, lat },
      zoom: 16,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [churchSelected]);

  const handleClickPopup = useCallback(() => {
    markerRef.current?.togglePopup();
  }, []);

  return (
    <>
      <Marker
        ref={markerRef}
        longitude={churchSelected?.lng || 0}
        latitude={churchSelected?.lat || 0}
        color="blue"
        onClick={handleClickPopup}
      />
    </>
  );
};
