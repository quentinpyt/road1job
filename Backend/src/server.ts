import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import fastifyPassport from "@fastify/passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authLogin from "./routes/login";
import authRegister from "./routes/register";
import sessionPlugin from "./plugins/session";
import passportGoogle from "./plugins/passportGoogle";
import logingoogle from "./routes/logingoogle";
import callback from "./routes/callback";
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
app.register(authLogin);

// --- Registration route ---
app.register(authRegister);

app.listen({ port: 3001, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server running on ${address}`);
});