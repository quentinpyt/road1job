import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import fastifyPassport from "@fastify/passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import sessionPlugin from "./plugins/session";
import passportGoogle from "./plugins/passportGoogle";
import getAllJob from "./routes/jobs";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";

const app = Fastify();

await app.register(cors, {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
});

await app.register(cookie);

// --- Session and Passport setup ---
await app.register(sessionPlugin);

// --- Passport Google OAuth config ---
await app.register(passportGoogle);

// --- Auth routes ---
await app.register(authRoutes);

// --- Get all jobs route ---
await app.register(getAllJob);

await app.register(usersRoutes);


app.listen({ port: 3001, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server running on ${address}`);
});