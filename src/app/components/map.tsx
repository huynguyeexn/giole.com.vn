"use client";
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../context";
import { Church } from "@/types/church";
import { Typography } from "antd";
const { Paragraph, Link, Text } = Typography;

const center = { lat: 14.058324, lng: 100.277199 };

const getChurchAddress = (church?: Church) => {
  if (!church) return;
  const name = `Nha tho ${church.name}, ${church.address}, ${church.district.name}, ${church.province.name}`;
  console.log(name);
  return name;
};

function MapCompoment() {
  const map = useMap();

  const { state } = useContext(HomeContext);

  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const geocodingLib = useMapsLibrary("geocoding");
  const markerLib = useMapsLibrary("marker");
  const placesLib = useMapsLibrary("places");

  const [infoWindowPos, setInfoWindowPos] = useState(center);

  useEffect(() => {
    if (!placesLib || !markerLib || !geocodingLib || !map) return;
    const placeService = new placesLib.PlacesService(map);
    const geocoder = new geocodingLib.Geocoder();

    const request = {
      address: getChurchAddress(state?.churchSelected),
    };
    const callback = (result: google.maps.GeocoderResult[] | null) => {
      if (result && result[0]) {
        const pos = result[0].geometry.location;
        const latLng = {
          lat: pos.lat(),
          lng: pos.lng(),
        };

        map.setCenter(pos);
        map.setZoom(15);
        map.fitBounds(result[0].geometry.viewport, {
          left: 500,
        });

        setInfoWindowPos(latLng);

        placeService.getDetails(
          {
            placeId: result[0].place_id,
            fields: ["name", "formatted_address", "url"],
          },
          (r: any) => {
            console.log(r);
          }
        );
      }
    };
    geocoder.geocode(request, callback);
  }, [
    state.churchSelected,
    map,
    geocodingLib,
    placesLib,
    markerLib,
    state.churches,
  ]);

  console.log(state);

  return (
    process.env && (
      <Map
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
        defaultCenter={center}
        defaultZoom={5}
        streetViewControl={false}
      >
        {state?.churchSelected && (
          <>
            <AdvancedMarker
              ref={markerRef}
              onClick={() => setInfowindowOpen(true)}
              position={infoWindowPos}
              title={"AdvancedMarker that opens an Infowindow when clicked."}
            ></AdvancedMarker>
            {infowindowOpen && (
              <InfoWindow
                anchor={marker}
                maxWidth={500}
                onCloseClick={() => setInfowindowOpen(false)}
              >
                <Text strong>Nhà thờ {state.churchSelected?.name}</Text>
                <Paragraph>
                  <ul>
                    <li>
                      Ngày thường: {state?.churchSelected?.normal_day || ""}
                    </li>
                    <li>Thứ Bảy: {state?.churchSelected?.saturday || ""}</li>
                    <li>Chúa Nhật: {state?.churchSelected?.sunday || ""}</li>
                  </ul>
                </Paragraph>
                <Link>Xem trên Google Map</Link>
              </InfoWindow>
            )}
          </>
        )}
      </Map>
    )
  );
}

function MapProvider() {
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}
      language="vi"
      region="VN"
      libraries={["marker"]}
    >
      <MapCompoment />
    </APIProvider>
  );
}

export default MapProvider;
