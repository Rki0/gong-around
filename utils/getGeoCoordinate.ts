import { getGeocode, getLatLng } from "use-places-autocomplete";

import { Coordinate } from "@/types/coordinate";

async function getGeoCoordinate(address: string) {
  let coordinate: Coordinate = {
    lat: 0,
    lng: 0,
  };

  const parameter = {
    address,
  };

  // getGeoCode is asynchronous function
  // TODO: try/catch : error handling
  const results = await getGeocode(parameter);

  const { lat, lng } = getLatLng(results[0]);

  coordinate.lat = lat;
  coordinate.lng = lng;

  return coordinate;
}

export default getGeoCoordinate;
