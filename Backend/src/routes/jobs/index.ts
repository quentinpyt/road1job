import { FastifyInstance } from "fastify";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  getJobController,
  updateJobController,
} from "../../controllers/jobs/job.controller";
import {
  validateCreateJobBody,
  validateJobId,
  validateUpdateJobBody,
} from "../../middleware/jobs/job.middleware";

export default async function jobRoutes(app: FastifyInstance) {
  app.get("/getalljob", getAllJobsController);
  app.get("/jobs/search", getAllJobsController);
  app.get("/jobs/:id", { preHandler: validateJobId }, getJobController);
  app.post("/jobs", { preHandler: validateCreateJobBody }, createJobController);
  app.put(
    "/jobs/:id",
    {
      preHandler: [validateJobId, validateUpdateJobBody],
    },
    updateJobController,
  );
  app.delete("/jobs/:id", { preHandler: validateJobId }, deleteJobController);
}