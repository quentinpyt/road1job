import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { FastifyInstance } from 'fastify'
// --- Login route ---
export default async function authLogin(app: FastifyInstance) {
app.post("/login", async (request, reply) => {
  const { email, password } = request.body as {
    email: string;
    password: string;
  };

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return reply.status(404).send({
        message: "Not have this user, you must register first!!",
      });
    }

    const verif_password = bcrypt.compareSync(password, user.passwordhash);

    if (!verif_password) {
      return reply.status(401).send({
        message: "Incorrect Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        surname: user.surname,
      },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "2h" }
    );

    reply.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 2,
      path: "/",
    });

    return reply.send({
      token,
      messageConnect: "Welcome !!!",
    });
  } catch (e: any) {
    console.log("error get " + e.message);

    return reply.status(401).send({
      error: "Login failed",
    });
  }
})};