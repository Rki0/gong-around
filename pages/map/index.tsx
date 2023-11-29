import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import PlacesAutoComplete from "@/components/google-map/PlacesAutoComplete";
import GoogleMaps from "@/components/google-map/GoogleMaps";

import { Coordinate } from "@/types/coordinate.ts";
import { Marker } from "@/types/marker.ts";

import styles from "./index.module.scss";

function MapPage() {
  const [mapCenter, setMapCenter] = useState<Coordinate | undefined>(undefined);
  const [markers, setMarkers] = useState<Marker[]>([]);

  const router = useRouter();

  // TODO: 본인 위치를 계산하는 로직이 getNearAirport.ts에 있음. 중복 로직이니까 거기서 redux에 저장하고 여기서 꺼내 쓰는 것도 괜찮을 것 같다. 아니면 공통 hook으로 빼는것도?
  const success = (position: GeolocationPosition) => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    setMapCenter(userLocation);
  };

  const error = () => {
    alert("위치 정보 탐색 실패! 다시 시도해주세요.");
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const queryLocation = router.query;

    if (Object.keys(queryLocation).length !== 0) {
      // chagne type to avoid router.query internal type(ParsedUrlQuery)
      // reference: https://stackoverflow.com/questions/65692699/how-can-i-cast-nextjs-router-query-as-a-number
      const parsedData = {
        lat: parseFloat(queryLocation.lat as string),
        lng: parseFloat(queryLocation.lng as string),
      };

      setMapCenter(parsedData);
    } else {
      navigator.geolocation.getCurrentPosition(success, error, {
        timeout: 1000 * 10, // 10 seconds
        maximumAge: 1000 * 3600, // 1 hour
      });
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    // TODO: api call to get top 10 feeds around the center of viewd map and set MapPage's setMarkers state
  }, [mapCenter]);

  // SUGGEST: If user clicks the mark on the map, show some information about that feed(marker) above the marker or on the other component.

  return (
    <section className={styles.section}>
      <PlacesAutoComplete setMapCenter={setMapCenter} />

      <GoogleMaps
        mapCenter={mapCenter}
        setMapCenter={setMapCenter}
        markers={markers}
      />
    </section>
  );
}

export default MapPage;
