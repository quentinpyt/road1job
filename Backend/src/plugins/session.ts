import fp from 'fastify-plugin'
import fastifyPassport from "@fastify/passport";
import fastifySecureSession from "@fastify/secure-session";

export default fp(async function sessionPlugin(app) {
await app.register(fastifySecureSession, {
  secret: process.env.SESSION_SECRET!,
  salt: process.env.SESSION_SALT!,
  cookie: {
    path: '/',
  }
});
await app.register(fastifyPassport.initialize());
await app.register(fastifyPassport.secureSession());
})