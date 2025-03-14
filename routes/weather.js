"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const weatherService_1 = require("../services/weatherService");
async function default_1(fastify) {
    fastify.get("/weather/today", async (request, reply) => {
        try {
            const data = await (0, weatherService_1.getTodayWeather)();
            return reply.send(data);
        }
        catch (error) {
            return reply.status(500).send({ error: "Failed to fetch weather data" });
        }
    });
}
