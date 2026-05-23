import { FastifyReply, FastifyRequest } from "fastify";
import {
  findAllUsers,
  findUserProfileById,
  updateUserProfileById,
  type ProfileUpdateInput,
} from "../../models/users/user.model";
import { getAuthenticatedUserId } from "../../middleware/users/user.middleware";

export async function listUsersController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const users = await findAllUsers();
  return reply.send(users);
}

export async function getProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const userId = getAuthenticatedUserId(request);

    if (!userId) {
      return reply.status(401).send({
        success: false,
        message: "Non authentifié",
      });
    }

    const user = await findUserProfileById(userId);

    if (!user) {
      return reply.status(404).send({
        success: false,
        message: "Utilisateur introuvable",
      });
    }

    return reply.send({
      success: true,
      user,
    });
  } catch {
    return reply.status(401).send({
      success: false,
      message: "Token invalide",
    });
  }
}

export async function updateProfileController(
  request: FastifyRequest<{ Body: ProfileUpdateInput }>,
  reply: FastifyReply,
) {
  try {
    const userId = getAuthenticatedUserId(request);

    if (!userId) {
      return reply.status(401).send({
        success: false,
        message: "Non authentifié",
      });
    }

    const updatedUser = await updateUserProfileById(userId, request.body);

    return reply.send({
      success: true,
      user: updatedUser,
    });
  } catch (error: any) {
    console.log("Erreur de mise à jour de l'utilisateur :", error.message);
    return reply.status(500).send({
      success: false,
      message: "Erreur lors de la mise à jour de l'utilisateur",
    });
  }
}