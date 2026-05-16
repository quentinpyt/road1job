import fp from "fastify-plugin";
import fastifyPassport from "@fastify/passport";
export default fp(async function logingoogle(app) {
app.get("/auth/google", fastifyPassport.authenticate("google", { scope: ["openid", "profile", "email"] }));
});