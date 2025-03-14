export const schema = `
  type BusArrival {
    trip: Trip
    realtimeArrival: Int
    headsign: String
  }

  type Trip {
    routeShortName: String
    headsign: String
  }

  type Stop {
    name: String
    stoptimesWithoutPatterns: [BusArrival]
  }

  type Query {
    getBusArrivals(stopId: String!): Stop
  }
`;
