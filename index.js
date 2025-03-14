"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const env_1 = __importDefault(require("@fastify/env"));
const hsl_1 = __importDefault(require("./routes/hsl"));
const hue_1 = __importDefault(require("./routes/hue"));
const porssisahko_1 = __importDefault(require("./routes/porssisahko"));
const weather_1 = __importDefault(require("./routes/weather"));
// Load environment variables from .env
dotenv_1.default.config();
const fastify = (0, fastify_1.default)({ logger: true });
// Define environment variable schema
const envSchema = {
    type: "object",
    required: ["HUE_BRIDGE_ID", "HUE_BRIDGE_IP"],
    properties: {
        HUE_BRIDGE_ID: { type: "string" },
        HUE_BRIDGE_IP: { type: "string" },
    },
};
// Register fastify-env plugin to validate environment variables
fastify.register(env_1.default, { schema: envSchema }).ready((err) => {
    if (err) {
        console.error("❌ Failed to load environment variables:", err);
        process.exit(1);
    }
    console.log("✅ Environment variables loaded:");
    console.log("Bridge ID:", process.env.HUE_BRIDGE_ID);
    console.log("Bridge IP:", process.env.HUE_BRIDGE_IP);
});
// Enable CORS
fastify.register(cors_1.default, {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type"],
});
// Register routes
fastify.register(hsl_1.default);
fastify.register(hue_1.default);
fastify.register(porssisahko_1.default);
fastify.register(weather_1.default);
// Start server
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: "0.0.0.0" });
        console.log("🚀 Server running at http://localhost:3000");
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
