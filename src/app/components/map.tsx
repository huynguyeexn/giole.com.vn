"use client";
import { Church } from "@/types/church";
import { mapAddress, mapChurchType } from "@/utils/helpers";
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Typography } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { HomeContext } from "../context";
const { Paragraph, Link, Text } = Typography;

const center = { lat: 16.4534687, lng: 107.5359134 };

const getChurchAddress = (church?: Church) => {
  if (!church) return;

  const name =
    mapChurchType(church.name, church.type) + ", " + mapAddress(church);
  return name;
};

function MapCompoment() {
  const map = useMap();

  const { state } = useContext(HomeContext);

  const [infowindowOpen, setInfowindowOpen] = useState(true);

  const [placeInfo, setPlaceInfo] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const geocodingLib = useMapsLibrary("geocoding");
  const markerLib = useMapsLibrary("marker");
  const placesLib = useMapsLibrary("places");

  const getChurchPositionCallback = useCallback(
    (
      result: google.maps.GeocoderResult[] | null,
      placeService: google.maps.places.PlacesService
    ) => {
      if (result && map) {
        const resultFind = result.find((r) => r.types.includes("church"));
        const finalResult = resultFind || result[0];

        const placeDetailResquest = {
          placeId: finalResult.place_id,
          fields: ["name", "formatted_address", "url", "geometry"],
        };

        const placeDetailCallback = (
          placeResult: google.maps.places.PlaceResult | null
        ) => {
          if (placeResult) {
            setPlaceInfo(placeResult);

            map.setZoom(13);
            map.fitBounds(finalResult.geometry.viewport);
          }
        };

        placeService.getDetails(placeDetailResquest, placeDetailCallback);
      }
    },
    [map]
  );

  useEffect(() => {
    if (!placesLib || !markerLib || !geocodingLib || !map) return;
    const placeService = new placesLib.PlacesService(map);
    const geocoder = new geocodingLib.Geocoder();

    const searchRequest = {
      address: getChurchAddress(state?.churchSelected),
      language: "vi",
      region: "VN",
    };

    geocoder.geocode(searchRequest, (result) =>
      getChurchPositionCallback(result, placeService)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.churchSelected]);

  return (
    process.env && (
      <Map
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
        defaultCenter={center}
        defaultZoom={6}
        streetViewControl={false}
      >
        {placeInfo !== null && (
          <>
            <AdvancedMarker
              ref={markerRef}
              onClick={() => setInfowindowOpen(true)}
              position={placeInfo.geometry?.location}
              title={"Nhấn (click) vào để xem thông tin chi tiết"}
            ></AdvancedMarker>
            {infowindowOpen && (
              <InfoWindow
                anchor={marker}
                maxWidth={400}
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
                <Link target="_shift" href={placeInfo.url}>
                  Xem trên Google Map{" "}
                </Link>
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
