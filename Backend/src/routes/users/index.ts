import { FastifyInstance } from "fastify";
import {
  getProfileController,
  listUsersController,
  updateProfileController,
} from "../../controllers/users/user.controller";
import {
  requireAuthenticatedUser,
  validateProfileUpdateBody,
} from "../../middleware/users/user.middleware";

export default async function usersRoutes(app: FastifyInstance) {
  app.get("/users", listUsersController);
  app.get("/profile/me", { preHandler: requireAuthenticatedUser }, getProfileController);
  app.put(
    "/profile/me",
    { preHandler: [requireAuthenticatedUser, validateProfileUpdateBody] },
    updateProfileController,
  );
}