import fp from "fastify-plugin";
import { FastifyInstance } from 'fastify'
import fastifyPassport from "@fastify/passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../../lib/prisma";


export default fp(async function passportGoogle(app: FastifyInstance) {
fastifyPassport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL,
      scope: ["openid", "profile", "email"],
    },
    // --- Verify callback ---
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("No email found in Google profile"), undefined);
        }

        let user = await prisma.user.findUnique({
          where: { email },
        });
        // If user doesn't exist, create a new one in database
        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name: profile.name?.givenName || profile.displayName || "",
              surname: profile.name?.familyName || "",
              passwordhash: "google_oauth",
            },
          });
        }

        return done(null, user);
      } catch (err: any) {
        return console.log(err.message || "An error occurred during Google authentication");
      }
    }
  )
);

fastifyPassport.registerUserSerializer(async (user: any, request) => {
  return user.id;
});

fastifyPassport.registerUserDeserializer(async (id: number | string, request) => {
  return await prisma.user.findUnique({ where: { id: Number(id) } });
});
});