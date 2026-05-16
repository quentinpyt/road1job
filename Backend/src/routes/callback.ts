import fp from "fastify-plugin";
import fastifyPassport from "@fastify/passport";
import jwt from "jsonwebtoken";
export default fp(async function callback(app) {
app.get(
  "/auth/google/callback",
  { preValidation: fastifyPassport.authenticate("google", { session: false }) as any },
  async (request, reply) => {
    const user = request.user as any;
    
    if (!user) {
      return reply.redirect(
        `${process.env.FRONTEND_URL}?error=google_auth_failed`
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        surname: user.surname,
      },
      process.env.JWT_SECRET!, 
      { expiresIn: "2h" }
    );

    return reply.redirect(
      `${process.env.FRONTEND_URL}/?token=${token}`
    );
  }
)});