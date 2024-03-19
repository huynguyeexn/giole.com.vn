"use client";
import Map, { GeolocateControl, NavigationControl } from "react-map-gl";

const mapboxKey = process.env.NEXT_PUBLIC_MAPBOX_KEY || "";

export default function MapBoxComponent() {
  return (
    <Map
      reuseMaps
      id="map"
      mapboxAccessToken={mapboxKey}
      initialViewState={{
        longitude: 107.5359134,
        latitude: 16.4534687,
        zoom: 5,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      <NavigationControl />
      <GeolocateControl />
    </Map>
  );
}
