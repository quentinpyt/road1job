import { FastifyInstance } from "fastify";

export default async function logout(app: FastifyInstance) {
  app.post("/logout", async (request, reply) => {
    reply.clearCookie("token");

    return reply.send({
      success: true,
      message: "Logged out",
    });
  });
}