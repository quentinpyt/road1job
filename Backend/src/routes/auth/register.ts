import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { FastifyInstance } from 'fastify'

export default async function authRegister(app: FastifyInstance) {
app.post("/register", async (request, reply) => {
  const { firstname, name, email, password } = request.body as {
    firstname: string;
    name: string;
    email: string;
    password: string;
  };

  if (!firstname || !name || !email || !password) {
    return reply.status(400).send({
      message: "empty form",
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return reply.status(409).send({
      message: "You have already created an account",
    });
  }

  const hash = bcrypt.hashSync(password, 8);

  const crypto = await import("crypto");
  //const tok = crypto.randomBytes(32).toString("hex");

  const user = await prisma.user.create({
    data: {
      email,
      passwordhash: hash,
      name,
      surname: firstname,
      //maybe add a tokken in db for email verification later
    },
  });

  const jwtToken = jwt.sign(
    {
      id: user.id,
      name: user.name,
      surname: user.surname,
    },
    process.env.JWT_SECRET!, 
    { expiresIn: "2h" }
  );

  return reply.send({
    messageConnect: "Inscription is correct! Go check your mail now",
    token: jwtToken,
  });
})};