import { FastifyReply, FastifyRequest } from "fastify";
import axios from "axios";
import { prisma } from "../../../lib/prisma";
import { getAuthenticatedUserId } from "../../middleware/users/user.middleware";

export async function getJobCompatibilityController(
  request: FastifyRequest<{ Params: { jobId: string } }>,
  reply: FastifyReply
) {
  try {
    const userId = getAuthenticatedUserId(request);

    if (!userId) {
      return reply.status(401).send({
        success: false,
        message: "Non authentifié",
      });
    }

    const jobId = parseInt(request.params.jobId, 10);

    if (isNaN(jobId)) {
      return reply.status(400).send({
        success: false,
        message: "ID du job invalide",
      });
    }

    // Get user skills
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { Skills: true },
    });

    if (!user) {
      return reply.status(404).send({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    // Get job skills
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        skills: true,
      },
    });

    if (!job) {
      return reply.status(404).send({
        success: false,
        message: "Job non trouvé",
      });
    }

    // Call Python AI service for compatibility calculation
    const aiServiceUrl = process.env.AI_SERVICE_URL;
    const response = await axios.post(`${aiServiceUrl}/calculate-compatibility`, {
      user_skills: user.Skills || "",
      job_skills: job.skills,
    });

    const compatibility = response.data;

    return reply.send({
      success: true,
      compatibility,
    });
  } catch (error: any) {
    console.error("Erreur lors du calcul de compatibilité:", error);
    return reply.status(500).send({
      success: false,
      message: "Erreur lors du calcul de compatibilité",
    });
  }
}
