import { FastifyReply, FastifyRequest } from "fastify";

type LoginBody = {
  email?: string;
  password?: string;
};

type RegisterBody = {
  firstname?: string;
  name?: string;
  email?: string;
  password?: string;
};

export async function validateLoginBody(
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body;

  if (!email || !password) {
    return reply.status(400).send({
      message: "email and password are required",
    });
  }
}

export async function validateRegisterBody(
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) {
  const { firstname, name, email, password } = request.body;

  if (!firstname || !name || !email || !password) {
    return reply.status(400).send({
      message: "empty form",
    });
  }
}