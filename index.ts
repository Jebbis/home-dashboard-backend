import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import fastifyEnv from "@fastify/env";
import mercurius from "mercurius";

import hslRoutes from "./routes/hsl";
import hueRoutes from "./routes/hue";
import porssisahkoRoutes from "./routes/porssisahko";
import weatherRoutes from "./routes/weather";

// Load environment variables from .env
dotenv.config();

const fastify = Fastify({ logger: true });

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
fastify.register(fastifyEnv, { schema: envSchema }).ready((err) => {
  if (err) {
    console.error("❌ Failed to load environment variables:", err);
    process.exit(1);
  }

  console.log("✅ Environment variables loaded:");
  console.log("Bridge ID:", process.env.HUE_BRIDGE_ID);
  console.log("Bridge IP:", process.env.HUE_BRIDGE_IP);
});

// Enable CORS
fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type"],
});

// Register the GraphQL plugin
fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: "playground",
});
// Register routes
fastify.register(hslRoutes);
fastify.register(hueRoutes);
fastify.register(porssisahkoRoutes);
fastify.register(weatherRoutes);

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🚀 Server running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
