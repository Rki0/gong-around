// reference
// https://www.99darshan.com/posts/interactive-maps-using-nextjs-and-google-maps
// https://www.npmjs.com/package/@react-google-maps/api#react-google-mapsapi
// https://web.archive.org/web/20230701010714mp_/https://react-google-maps-api-docs.netlify.app/#section-introduction
// https://stackoverflow.com/questions/68425883/how-can-i-get-the-current-map-center-coordinates-using-getcenter-in-react-googl

import React, { useMemo, useState } from "react";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  CircleF,
} from "@react-google-maps/api";
import { useRouter } from "next/router";

import { Coordinate } from "@/types/coordinate";
import { Marker } from "@/types/marker.ts";

import styles from "./GoogleMaps.module.scss";

interface GoogleMapsProps {
  mapCenter: Coordinate | undefined;
  setMapCenter: React.Dispatch<React.SetStateAction<Coordinate | undefined>>;
  markers: Marker[];
}

function GoogleMaps(props: GoogleMapsProps) {
  const { mapCenter, setMapCenter, markers } = props;
  const [mapRef, setMapRef] = useState<any>();

  const router = useRouter();

  const libraries = useMemo(() => ["places", "maps"], []);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    libraries: libraries as any,
  });

  const onLoadHandler = (map: any) => {
    setMapRef(map);

    // reference : how to automatically adjust zoom so all markers are visible using react-google-maps/api
    // https://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers
    // https://stackoverflow.com/questions/2362337/how-to-set-the-google-map-zoom-level-to-show-all-the-markers
    const bounds = new google.maps.LatLngBounds();

    for (const marker of markers) {
      bounds.extend({
        lat: marker.location.coordinates[1],
        lng: marker.location.coordinates[0],
      });
    }

    map.fitBounds(bounds);
  };

  const onIdleHandler = () => {
    if (!mapRef || !mapCenter) {
      return;
    }

    // FIXME: mapCenter가 이미 있는데 초기 newCenter(0,180)을 잡아버리는 문제가 있음.
    // 그런데 idle이 바뀔 때는 또 이 함수를 실행하긴 해야함..

    // FIXME: 날짜경계선 오른쪽으로 가면 180을 넘어버리는 문제가 있음! client 상에서는 문제가 없지만, DB에서 연산할 수 있는 범위가 -180 ~ 180이기 때문에 에러가 발생함.
    const newCenterData = mapRef.getCenter();

    const newCenter = {
      lat: newCenterData.lat(),
      lng: newCenterData.lng(),
    };

    if (mapCenter.lat === newCenter.lat && mapCenter.lng === newCenter.lng) {
      return;
    }

    setMapCenter(newCenter);
  };

  // onMouseOver was invoked when mouse hover on the marker
  const onMouseOverHandler = (e: google.maps.MapMouseEvent) => {
    // 어떻게 떨어진 컴포넌트의 hover를 발생시킬까..?
    // ref?를 걸어서 스타일만 변경해도 되잖아. 굳이 hover()라는 이벤트가 중요한게 아니지
    // 왼쪽에 있는 feed에도 뭔가 효과를 줘야하고, 마커에도 효과를 줘야함. 동시에.

    // 마커 효과
    const targetMarker = e.domEvent.target as HTMLElement;

    if (!targetMarker) {
      return;
    }

    const parentDiv = targetMarker.closest("div");

    if (!parentDiv) {
      return;
    }

    // parentDiv.style.border = "10px solid black";
    // parentDiv.style.borderRadius = "50%";

    // const markerImg = parentDiv.children[0] as HTMLElement;

    // if (!markerImg) {
    //   return;
    // }

    // markerImg.style.width = "100px";
    // markerImg.style.height = "100px";
  };

  // onMouseUp was invoked when mouse click the marker
  const onMouseUpHandler = (feedId: string) => {
    // SUGGEST: User can drag the map, so click event maybe disturb UX(moving map center)
    // Also, clicking marker just have feature to move user to feed detail page, so It's not essential feature.
    router.push({
      pathname: "community/[feedId]",
      query: {
        feedId,
      },
    });
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.map_container}>
      {mapCenter ? (
        <GoogleMap
          options={mapOptions}
          zoom={13}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onLoad={onLoadHandler}
          onIdle={onIdleHandler}
        >
          <CircleF
            center={mapCenter}
            radius={20000}
            options={{
              fillColor: "green",
              strokeColor: "green",
              strokeOpacity: 0.5,
            }}
          />

          {/* SUGGEST: MarkerF 보다는 네이버 맵 처럼 점으로 표시하는게 나을듯. 이 컴포넌트 모양을 바꿀 수 있나? icon으로 이미지를 가져다가 쓰나? */}
          {/* <MarkerF
            opacity={0.5}
            label="탐색 기준"
            position={{
              lat: mapCenter.lat,
              lng: mapCenter.lng,
            }}
          /> */}

          {markers.length !== 0
            ? markers.map((marker) => (
                <MarkerF
                  key={marker._id}
                  position={{
                    lat: marker.location.coordinates[1],
                    lng: marker.location.coordinates[0],
                  }}
                  onMouseOver={onMouseOverHandler}
                  onMouseUp={() => onMouseUpHandler(marker.feed._id)}
                  opacity={0.5}
                />
              ))
            : null}
        </GoogleMap>
      ) : (
        <p>위치를 파악 중이에요...</p>
      )}
    </div>
  );
}

export default GoogleMaps;
