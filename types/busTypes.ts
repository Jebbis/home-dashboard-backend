export interface BusArrival {
  scheduledArrival: number;
  realtimeArrival: number;
  arrivalDelay: number;
  scheduledDeparture: number;
  realtimeDeparture: number;
  departureDelay: number;
  realtime: boolean;
  realtimeState: string;
  serviceDay: number;
  headsign: string;
  trip: {
    routeShortName: string;
  };
}

export interface BusStopData {
  name: string;
  stoptimesWithoutPatterns: BusArrival[];
}

export interface BusResponse {
  stop: BusStopData | null;
}
