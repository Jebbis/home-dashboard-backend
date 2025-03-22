import { gql } from "graphql-request";
export const GET_BUS_ARRIVALS = gql `
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
export const GET_TIME_TO_DESTINATION = gql `
  query GetTimeToDestination(
    $latitude: CoordinateValue!
    $longitude: CoordinateValue!
  ) {
    planConnection(
      origin: {
        location: { coordinate: { latitude: 60.331626, longitude: 25.0522392 } }
      }
      destination: {
        location: { coordinate: { latitude: $latitude, longitude: $longitude } }
      }
      first: 2
    ) {
      edges {
        node {
          start
          end
          legs {
            duration
            mode
            trip {
              routeShortName
            }
            start {
              scheduledTime
            }
            end {
              scheduledTime
            }
            mode
            duration
            realtimeState
          }
        }
      }
    }
  }
`;
