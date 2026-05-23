import { FastifyReply, FastifyRequest } from "fastify";

type JobIdParams = {
  id: string;
};

type JobBody = {
  name?: string;
  description?: string;
  company?: string;
  type?: string;
  experience?: number | null;
};

export async function validateJobId(
  request: FastifyRequest<{ Params: JobIdParams }>,
  reply: FastifyReply,
) {
  const jobId = Number(request.params.id);

  if (!Number.isInteger(jobId) || jobId <= 0) {
    return reply.status(400).send({
      success: false,
      message: "Invalid job id",
    });
  }
}

export async function validateCreateJobBody(
  request: FastifyRequest<{ Body: JobBody }>,
  reply: FastifyReply,
) {
  const { name, description, company, type } = request.body;

  if (!name || !description || !company || !type) {
    return reply.status(400).send({
      success: false,
      message: "name, description, company and type are required",
    });
  }
}

export async function validateUpdateJobBody(
  request: FastifyRequest<{ Body: JobBody }>,
  reply: FastifyReply,
) {
  const { name, description, company, type, experience } = request.body;

  if (
    name === undefined &&
    description === undefined &&
    company === undefined &&
    type === undefined &&
    experience === undefined
  ) {
    return reply.status(400).send({
      success: false,
      message: "At least one job field must be provided",
    });
  }
}