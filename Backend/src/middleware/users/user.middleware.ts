import jwt from "jsonwebtoken";
import { FastifyReply, FastifyRequest } from "fastify";

type ProfileUpdateBody = {
  name?: string;
  surname?: string;
  age?: number;
  address?: string;
};

export function getAuthenticatedUserId(request: FastifyRequest) {
  let userId: number | undefined = (request as any).user?.id;

  let token = request.headers.cookie
    ?.split("; ")
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];

  if (!token && request.headers.authorization?.startsWith("Bearer ")) {
    token = request.headers.authorization.split(" ")[1];
  }

  if (!userId && token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!,
      ) as { id: number };
      userId = Number(decoded.id);
    } catch {
      return undefined;
    }
  }

  return userId;
}

export async function requireAuthenticatedUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = getAuthenticatedUserId(request);

  if (!userId) {
    return reply.status(401).send({
      success: false,
      message: "Non authentifié",
    });
  }
}

export async function validateProfileUpdateBody(
  request: FastifyRequest<{ Body: ProfileUpdateBody }>,
  reply: FastifyReply,
) {
  const { name, surname, age, address } = request.body;

  if (
    name === undefined &&
    surname === undefined &&
    age === undefined &&
    address === undefined
  ) {
    return reply.status(400).send({
      success: false,
      message: "At least one profile field must be provided",
    });
  }
}