import { FastifyInstance } from "fastify";
import { fetchGraphQL } from "../services/hslService";

export default async function (fastify: FastifyInstance) {
  fastify.get("/hsl-data", async (request, reply) => {
    const data = await fetchGraphQL();
    return reply.send(data);
  });
}
