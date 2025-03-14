import { FastifyInstance } from "fastify";
import { getTodayWeather } from "../services/weatherService";

export default async function (fastify: FastifyInstance) {
  fastify.get("/weather/today", async (request, reply) => {
    try {
      const data = await getTodayWeather();
      return reply.send(data);
    } catch (error) {
      return reply.status(500).send({ error: "Failed to fetch weather data" });
    }
  });
}
