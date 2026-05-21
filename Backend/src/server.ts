import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import fastifyPassport from "@fastify/passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authLogin from "./routes/auth/login";
import authRegister from "./routes/auth/register";
import sessionPlugin from "./plugins/session";
import passportGoogle from "./plugins/passportGoogle";
import logingoogle from "./routes/auth/logingoogle";
import callback from "./routes/auth/callback";
import getAllJob from "./routes/jobs/getalljob";
import profileRoutes from "./routes/users/profile";
import logout from "./routes/auth/logout";

const app = Fastify();

await app.register(cors, {
  origin: process.env.FRONTEND_URL ,
  credentials: true,
});

await app.register(cookie);

// --- Session and Passport setup ---
await app.register(sessionPlugin);

// --- Passport Google OAuth config ---
await app.register(passportGoogle);

// --- Google OAuth routes ---

await app.register(logingoogle);

await app.register(callback);

// --- Login route ---
await app.register(authLogin);

// --- Logout route ---
await app.register(logout);
// --- Registration route ---
await app.register(authRegister);

// --- Get all jobs route ---
await app.register(getAllJob);

await app.register(profileRoutes);


app.listen({ port: 3001, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server running on ${address}`);
});