"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const hueService_1 = require("../services/hueService");
async function default_1(fastify) {
    fastify.get("/hue/lights/:lightId", async (request, reply) => {
        const { lightId } = request.params;
        try {
            const data = await (0, hueService_1.fetchLightState)(lightId);
            return reply.send(data);
        }
        catch (error) {
            return reply.status(500).send({ error: "Failed to fetch light state" });
        }
    });
    fastify.put("/hue/lights/:lightId/state", async (request, reply) => {
        const { lightId } = request.params;
        try {
            const updatedState = await (0, hueService_1.toggleLightState)(lightId);
            return reply.send(updatedState);
        }
        catch (error) {
            return reply.status(500).send({ error: "Failed to update light state" });
        }
    });
    fastify.put("/hue/lights/:lightId/brightness/:bri", async (request, reply) => {
        const { lightId, bri } = request.params;
        try {
            const updatedState = await (0, hueService_1.toggleLightBrightness)(lightId, bri);
            return reply.send(updatedState);
        }
        catch (error) {
            return reply
                .status(500)
                .send({ error: "Failed to update light brigthness" });
        }
    });
}
