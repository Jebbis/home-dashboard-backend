import { FastifyInstance } from "fastify";
import { fetchExternalData } from "../services/porssisahkoService";

export default async function (fastify: FastifyInstance) {
  fastify.get("/external-data", async (request, reply) => {
    const data = await fetchExternalData();
    return reply.send(data);
  });
}
