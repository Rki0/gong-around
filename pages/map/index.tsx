import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import PlacesAutoComplete from "@/components/google-map/PlacesAutoComplete";
import GoogleMaps from "@/components/google-map/GoogleMaps";
import MapIcon from "@/assets/map.svg";
import ViewIcon from "@/assets/view.svg";
import LikeIcon from "@/assets/thumbs-up.svg";
import TextIcon from "@/assets/text.svg";

import { Coordinate } from "@/types/coordinate.ts";
import { Marker } from "@/types/marker.ts";

import styles from "./index.module.scss";
import Link from "next/link";

function MapPage(props: any) {
  const [mapCenter, setMapCenter] = useState<Coordinate | undefined>(undefined);
  const [markers, setMarkers] = useState<Marker[]>(props.markers);

  const router = useRouter();

  // TODO: 본인 위치를 계산하는 로직이 getNearAirport.ts에 있음. 중복 로직이니까 거기서 redux에 저장하고 여기서 꺼내 쓰는 것도 괜찮을 것 같다. 아니면 공통 hook으로 빼는것도?
  const success = (position: GeolocationPosition) => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    // SUGGEST: 그냥 여기서 URL query에 lat, lng 넣고, router.query 변경 감지하는 곳에서 setMapCenter를 하도록 하면 안될까?

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
      // change type to avoid router.query internal type(ParsedUrlQuery)
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
    // FIXME: 랜딩페이지에서 버튼 클릭해서 들어오는건 괜찮은데, url에 쿼리가 없을 때 문제가 발생함.
    if (!mapCenter) {
      return;
    }

    console.log("center change!");

    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND}/location?lat=${mapCenter.lat}&lng=${mapCenter.lng}`
      );

      if (!response.ok) {
        throw new Error("마커 탐색 실패");
      }

      const data = await response.json();

      console.log(data);

      setMarkers(data.markers);
    };

    fetchData();
  }, [mapCenter]);

  return (
    <section className={styles.section}>
      <div className={styles.map_div}>
        <PlacesAutoComplete setMapCenter={setMapCenter} />

        <GoogleMaps
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          markers={markers}
        />
      </div>

      <div className={styles.markers_div}>
        {markers.length !== 0 ? (
          markers.map((marker: any) => (
            <Link
              href={{
                pathname: "/community/[feedId]",
                query: {
                  feedId: marker.feed._id,
                },
              }}
              key={marker._id}
              className={styles.marker}
            >
              {marker.feed.images.length !== 0 ? (
                <Image
                  src={marker.feed.images[0].path}
                  className={styles.marker_img}
                  alt="thumbnail"
                  width={150}
                  height={150}
                />
              ) : (
                <div>No Image</div>
              )}

              <div className={styles.marker_content}>
                <p>
                  <MapIcon />
                  {marker.address}
                </p>
                <p>
                  <TextIcon />
                  {marker.feed.title}
                </p>

                <div className={styles.popularity}>
                  <p>
                    <LikeIcon />
                    {marker.feed.like}
                  </p>
                  <p>
                    <ViewIcon />
                    {marker.feed.view}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </section>
  );
}

export default MapPage;

export async function getServerSideProps(context: any) {
  const { lat, lng } = context.query;

  if (!lat || !lng) {
    return {
      props: {
        markers: [],
      },
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BACKEND}/location?lat=${lat}&lng=${lng}`
  );

  const data = await response.json();

  return {
    props: {
      markers: data.markers || [],
    },
  };
}
