import fp from "fastify-plugin";
import { FastifyInstance } from 'fastify'
import fastifyPassport from "@fastify/passport";
import bcrypt from "bcryptjs";
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

        let user = await prisma.user.findUnique({ where: { email } });

        // If user doesn't exist, create a new user record using Google profile info
        if (!user) {
          const givenName = profile.name?.givenName ?? null;
          const familyName = profile.name?.familyName ?? null;

          // generate a random passwordhash for accounts created via Google
          const randomPwd = Math.random().toString(36).slice(2);
          const hash = bcrypt.hashSync(randomPwd, 8);

          user = await prisma.user.create({
            data: {
              email,
              passwordhash: hash,
              name: givenName ?? undefined,
              surname: familyName ?? undefined,
            },
          });
        }

        return done(null, user);
      } catch (err: any) {
        console.log(err?.message || "An error occurred during Google authentication");
        return done(err, undefined);
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