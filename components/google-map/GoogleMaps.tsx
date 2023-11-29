// reference
// https://www.99darshan.com/posts/interactive-maps-using-nextjs-and-google-maps
// https://www.npmjs.com/package/@react-google-maps/api#react-google-mapsapi
// https://web.archive.org/web/20230701010714mp_/https://react-google-maps-api-docs.netlify.app/#section-introduction
// https://stackoverflow.com/questions/68425883/how-can-i-get-the-current-map-center-coordinates-using-getcenter-in-react-googl

import React, { useMemo, useState } from "react";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";

import { Coordinate } from "@/types/coordinate";
import { Marker } from "@/types/marker.ts";

interface GoogleMapsProps {
  mapCenter: Coordinate | undefined;
  setMapCenter: React.Dispatch<React.SetStateAction<Coordinate | undefined>>;
  markers: Marker[];
}

function GoogleMaps(props: GoogleMapsProps) {
  const { mapCenter, setMapCenter, markers } = props;
  const [mapRef, setMapRef] = useState<any>();

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
  };

  const onIdleHandler = () => {
    if (!mapRef || !mapCenter) {
      return;
    }

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

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {mapCenter ? (
        <GoogleMap
          options={mapOptions}
          zoom={13}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: "600px", height: "600px" }}
          onLoad={onLoadHandler}
          onIdle={onIdleHandler}
        >
          {/* {markers.map((marker) => (
            <MarkerF />
          ))} */}
        </GoogleMap>
      ) : (
        <p>위치를 파악 중이에요...</p>
      )}
    </>
  );
}

export default GoogleMaps;
