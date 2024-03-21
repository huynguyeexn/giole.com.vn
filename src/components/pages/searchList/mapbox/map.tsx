"use client";
import { ChurchListContext } from "@/context/churchListContext";
import { Church } from "@/types/church";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useContext, useEffect, useRef } from "react";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  useMap,
} from "react-map-gl";

const mapboxKey = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

const MapComponent = () => {
  const { state } = useContext(ChurchListContext);

  return (
    <Map
      id="map"
      reuseMaps={true}
      mapboxAccessToken={mapboxKey}
      initialViewState={{
        longitude: 107.5359134,
        latitude: 16.4534687,
        zoom: 5,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {state.churchSelected && (
        <MapMarkerAndPopup churchSelected={state.churchSelected} />
      )}
      <NavigationControl />
      <GeolocateControl />
    </Map>
  );
};

const MapMarkerAndPopup = ({ churchSelected }: { churchSelected: Church }) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const { state } = useContext(ChurchListContext);

  const { map } = useMap();

  useEffect(() => {
    if (!map || !state.churchSelected) return;
    const { lat, lng } = state.churchSelected;

    const options = {
      center: { lng, lat },
      zoom: 16,
      duration: 2000,
    };
    map.jumpTo(options);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.churchSelected]);

  useEffect(() => {
    markerRef.current
      ?.setPopup(
        new mapboxgl.Popup({
          anchor: "bottom",
          offset: 25,
          closeButton: true,
          closeOnClick: true,
          closeOnMove: false,
          maxWidth: "300px",
          focusAfterOpen: true,
        }).setHTML(
          `<div class="px-4">
          <p class="font-bold">Nhà thờ ${churchSelected.name}</p>
          <ul>
            <li>Ngày thường: ${churchSelected.normal_day}</li>
            <li>Thứ Bảy: ${churchSelected.saturday}</li>
            <li>Chúa Nhật: ${churchSelected.sunday}</li>
          </ul>
        </div>`
        )
      )
      .togglePopup();
  }, [churchSelected]);

  const togglePopup = useCallback(() => {
    markerRef.current?.togglePopup();
  }, []);

  return (
    <Marker
      longitude={churchSelected.lng}
      latitude={churchSelected.lat}
      color="red"
      ref={markerRef}
      onClick={togglePopup}
    />
  );
};

export default MapComponent;
