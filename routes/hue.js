import { fetchLightState, toggleLightState, toggleLightBrightness, } from "../services/hueService.js";
export default async function (fastify) {
    fastify.get("/hue/lights/:lightId", async (request, reply) => {
        const { lightId } = request.params;
        try {
            const data = await fetchLightState(lightId);
            return reply.send(data);
        }
        catch (error) {
            return reply.status(500).send({ error: "Failed to fetch light state" });
        }
    });
    fastify.put("/hue/lights/:lightId/state", async (request, reply) => {
        const { lightId } = request.params;
        try {
            const updatedState = await toggleLightState(lightId);
            return reply.send(updatedState);
        }
        catch (error) {
            return reply.status(500).send({ error: "Failed to update light state" });
        }
    });
    fastify.put("/hue/lights/:lightId/brightness/:bri", async (request, reply) => {
        const { lightId, bri } = request.params;
        try {
            const updatedState = await toggleLightBrightness(lightId, bri);
            return reply.send(updatedState);
        }
        catch (error) {
            return reply
                .status(500)
                .send({ error: "Failed to update light brigthness" });
        }
    });
}
