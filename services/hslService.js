import { request, gql } from "graphql-request";
const HSL_API_URL = "https://api.digitransit.fi/routing/v2/hsl/gtfs/v1?digitransit-subscription-key=154d783c2741481c89cebfaf13ba5275";
const GET_BUS_ARRIVALS = gql `
  query GetBusArrivals($stopId: String!) {
    stop(id: $stopId) {
      name
      stoptimesWithoutPatterns {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        realtime
        realtimeState
        serviceDay
        headsign
        trip {
          routeShortName
        }
      }
    }
  }
`;
export const fetchBusArrivals = async (stopId) => {
    try {
        const data = await request(HSL_API_URL, GET_BUS_ARRIVALS, {
            stopId,
        });
        console.log(data);
        return data.stop;
    }
    catch (error) {
        console.error("Error fetching bus arrivals:", error);
        return null;
    }
};
