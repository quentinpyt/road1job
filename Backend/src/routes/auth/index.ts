import fp from "fastify-plugin";
import fastifyPassport from "@fastify/passport";
import { FastifyInstance } from "fastify";
import {
  googleCallbackController,
  loginController,
  logoutController,
  registerController,
} from "../../controllers/auth/auth.controller";
import {
  validateLoginBody,
  validateRegisterBody,
} from "../../middleware/auth/auth.middleware";

export default fp(async function authRoutes(app: FastifyInstance) {
  app.post("/login", { preHandler: validateLoginBody }, loginController);
  app.post("/register", { preHandler: validateRegisterBody }, registerController);
  app.post("/logout", logoutController);
  app.get(
    "/auth/google",
    fastifyPassport.authenticate("google", { scope: ["openid", "profile", "email"] }),
  );
  app.get(
    "/auth/google/callback",
    { preValidation: fastifyPassport.authenticate("google", { session: false }) as any },
    googleCallbackController,
  );
});