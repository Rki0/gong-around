import { useEffect, useState } from "react";

import airportData from "@/data/airport.json";

interface Airport {
  name_ko: string;
  lat: number;
  lon: number;
}

interface CountryAirports {
  [key: string]: Airport;
}

interface AirportsData {
  korea: CountryAirports;
  japan: CountryAirports;
}

let lat: number;
let lon: number;
let nearestAirport: null | string = null;
let shortestDistance: null | number = null;

const calculateNearestAirport = (iterObj: CountryAirports) => {
  for (const airport in iterObj) {
    const airportInfo: Airport = iterObj[airport];

    const gapOfLat = lat - airportInfo.lat;
    const gapOfLon = lon - airportInfo.lon;

    const distance = Math.sqrt(Math.pow(gapOfLat, 2) + Math.pow(gapOfLon, 2));

    if (!shortestDistance) {
      shortestDistance = distance;
      nearestAirport = airportInfo.name_ko;
      continue;
    }

    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestAirport = airportInfo.name_ko;
    }
  }
};

export const useNearAirport = () => {
  const [userLocation, setUserLocation] = useState<string | null>(null);

  const success = (position: GeolocationPosition) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    for (const country in airportData) {
      const countryObj = airportData[country as keyof AirportsData];

      calculateNearestAirport(countryObj);
    }

    setUserLocation(nearestAirport);
  };

  const error = () => {
    alert("위치 정보 탐색 실패! 다시 시도해주세요.");
  };

  // TODO: success와 error가 두 번씩 실행되는 문제가 있음. 렌더링 문제인건지 뭔지 확인이 안되고 있음. 확인 필요.
  // navigator.geolocation.getCurrentPosition()는 반환값이 void이기 때문에, utils에 일반 함수로 작성해서 사용하기 보다는
  // custom hook으로 생성해서 success나 error의 상황에서 setState 후, state를 반환하도록 하는 것이 좋다고 판단됨.
  // navigator.geolocation.getCurrentPosition(success, error, {
  //   timeout: 1000 * 10, // 10 seconds
  //   maximumAge: 1000 * 3600, // 1 hour
  // });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, {
      timeout: 1000 * 10, // 10 seconds
      maximumAge: 1000 * 3600, // 1 hour
    });
  }, []);

  return userLocation;
};
