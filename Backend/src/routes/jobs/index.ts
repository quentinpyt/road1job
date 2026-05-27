import { FastifyInstance } from "fastify";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  getJobController,
  updateJobController,
  getAvailableSkillsController,
  getTopSkillsController,
} from "../../controllers/jobs/job.controller";
import {
  validateCreateJobBody,
  validateJobId,
  validateUpdateJobBody,
} from "../../middleware/jobs/job.middleware";
import { getJobCompatibilityController } from "../../controllers/jobs/compatibility.controller";

export default async function jobRoutes(app: FastifyInstance) {
  app.get("/getalljob", getAllJobsController);
  app.get("/jobs/search", getAllJobsController);
  app.get("/jobs/skills", getAvailableSkillsController);
  app.get("/jobs/stats/top-skills", getTopSkillsController);
  app.get("/jobs/:id", { preHandler: validateJobId }, getJobController);
  app.get("/jobs/:jobId/compatibility", getJobCompatibilityController);
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