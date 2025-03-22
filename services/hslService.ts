import { request } from "graphql-request";
import { BusStopData, BusResponse } from "../types/busTypes.js";
import {
  GET_BUS_ARRIVALS,
  GET_TIME_TO_DESTINATION,
} from "../graphql/hslQueries.js";

const HSL_API_URL =
  "https://api.digitransit.fi/routing/v2/hsl/gtfs/v1?digitransit-subscription-key=154d783c2741481c89cebfaf13ba5275";

export const fetchBusArrivals = async (
  stopId: string
): Promise<BusStopData | null> => {
  try {
    const data: BusResponse = await request(HSL_API_URL, GET_BUS_ARRIVALS, {
      stopId,
    });
    console.log(data);

    return data.stop;
  } catch (error) {
    console.error("Error fetching bus arrivals:", error);
    return null;
  }
};

export const fetchTimeToDestination = async (
  latitude: number,
  longitude: number
): Promise<any> => {
  try {
    const data: any = await request(HSL_API_URL, GET_TIME_TO_DESTINATION, {
      latitude,
      longitude,
    });

    return data;
  } catch (error) {
    console.error("Error fetching time to destination:", error);
    return null;
  }
};
