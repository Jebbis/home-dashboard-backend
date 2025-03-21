import { FastifyInstance } from "fastify";
import { getTimeToWork } from "../services/timeToWorkService.js";

export default async function (fastify: FastifyInstance) {
  fastify.get("/timetowork/:locationId", async (request, reply) => {
    const { locationId } = request.params as { locationId: string };
    try {
      const data = await getTimeToWork(locationId);
      return reply.send(data);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to fetch weather data" });
    }
  });
}
