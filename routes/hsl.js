import { fetchBusArrivals, fetchTimeToDestination, } from "../services/hslService.js";
import dotenv from "dotenv";
dotenv.config();
export default async function hslRoutes(fastify) {
    fastify.get("/bus/:stopId", async (request, reply) => {
        const { stopId } = request.params;
        const stopData = await fetchBusArrivals(stopId);
        if (!stopData) {
            return reply.status(500).send({ error: "Failed to fetch bus data" });
        }
        return reply.send(stopData);
    });
    fastify.get("/timeToDestination/:id", async (request, reply) => {
        const { id } = request.params;
        const latitude = id === "1"
            ? Number(process.env.END_LOC_1_LAT)
            : Number(process.env.END_LOC_2_LAT);
        const longitude = id === "1"
            ? Number(process.env.END_LOC_1_LON)
            : Number(process.env.END_LOC_2_LON);
        const timeToDestinationData = await fetchTimeToDestination(latitude, longitude);
        if (!timeToDestinationData) {
            return reply
                .status(500)
                .send({ error: "Failed to time to destination data" });
        }
        return reply.send(timeToDestinationData);
    });
}
