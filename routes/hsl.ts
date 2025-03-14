import { FastifyInstance } from "fastify";
import { fetchBusArrivals } from "../services/hslService.js";

export default async function hslRoutes(fastify: FastifyInstance) {
  fastify.get("/bus/:stopId", async (request, reply) => {
    const { stopId } = request.params as { stopId: string };

    const stopData = await fetchBusArrivals(stopId);
    if (!stopData) {
      return reply.status(500).send({ error: "Failed to fetch bus data" });
    }

    return reply.send(stopData);
  });
}
