import mapboxgl, { Map } from "mapbox-gl";
import { useContext, useEffect, useRef, useState } from "react";

import { HomeContext } from "../context";
import styles from "./styles.module.scss";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

export default function MapContainer() {
  const { state } = useContext(HomeContext);
  const mapContainer = useRef(null);
  const map = useRef<Map | undefined>();

  useEffect(() => {
    if (!map.current || !state.churchSelected) return;
    const currentChurch = state.churchSelected;
    const { lat, lng } = currentChurch;

    const options = {
      center: { lng, lat },
      zoom: 17,
      duration: 2000,
    };

    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: true,
      closeOnClick: true,
      closeOnMove: false,
      maxWidth: "300px",
      focusAfterOpen: true,
    })
      .setHTML(
        `<div class="${styles.popup}">
          <p>Nhà thờ ${currentChurch.name}</p>
          <ul>
            <li>Ngày thường: ${currentChurch.normal_day}</li>
            <li>Thứ Bảy: ${currentChurch.saturday}</li>
            <li>Chúa Nhật: ${currentChurch.sunday}</li>
          </ul>
        </div>`
      )
      .addTo(map.current);

    new mapboxgl.Marker()
      .setPopup(popup)
      .setLngLat({ lat, lng })
      .addTo(map.current)
      .togglePopup();

    map.current.flyTo(options);
  }, [state.churchSelected]);

  useEffect(() => {
    if (map.current) return;
    const center = { lat: 16.4534687, lng: 107.5359134 };

    map.current = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/streets-v12",
      center: center,
      zoom: 5,
    });

    map.current.addControl(new mapboxgl.NavigationControl());
  }, []);

  return (
    <>
      <div className={styles.mapBox} ref={mapContainer} />
    </>
  );
}
