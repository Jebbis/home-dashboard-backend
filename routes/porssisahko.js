"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const porssisahkoService_1 = require("../services/porssisahkoService");
async function default_1(fastify) {
    fastify.get("/external-data", async (request, reply) => {
        const data = await (0, porssisahkoService_1.fetchExternalData)();
        return reply.send(data);
    });
}
