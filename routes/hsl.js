"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const hslService_1 = require("../services/hslService");
async function default_1(fastify) {
    fastify.get("/hsl-data", async (request, reply) => {
        const data = await (0, hslService_1.fetchGraphQL)();
        return reply.send(data);
    });
}
