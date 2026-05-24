import { FastifyReply, FastifyRequest } from "fastify";
import {
  createJob,
  deleteJobById,
  findAllJobs,
  findJobById,
  searchJobsByWord,
  updateJobById,
  type CreateJobInput,
  type UpdateJobInput,
} from "../../models/jobs/job.model";

type JobIdParams = {
  id: string;
};

type JobSearchQuery = {
  word?: string;
};

export async function getAllJobsController(
  request: FastifyRequest<{ Querystring: JobSearchQuery }>,
  reply: FastifyReply,
) {
  try {
    const { word } = request.query;
    const jobs = word
      ? await searchJobsByWord({ word })
      : await findAllJobs();

    return reply.send(jobs);
  } catch (error: any) {
    console.log("error get " + error.message);
    return reply.status(500).send({
      error: "Failed to retrieve jobs",
    });
  }
}

export async function getJobController(
  request: FastifyRequest<{ Params: JobIdParams }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const job = await findJobById(Number(id));

    if (!job) {
      return reply.status(404).send({
        success: false,
        message: "Job not found",
      });
    }

    return reply.send({
      success: true,
      job,
    });
  } catch (error: any) {
    console.log("Job detail error:", error.message);

    return reply.status(500).send({
      success: false,
      error: "Failed to retrieve job",
    });
  }
}

export async function createJobController(
  request: FastifyRequest<{ Body: CreateJobInput }>,
  reply: FastifyReply,
) {
  try {
    const job = await createJob(request.body);

    return reply.send({
      success: true,
      job,
    });
  } catch (error: any) {
    console.log("Job creation error:", error.message);

    return reply.status(500).send({
      success: false,
      error: "Failed to create job",
    });
  }
}

export async function updateJobController(
  request: FastifyRequest<{ Params: JobIdParams; Body: UpdateJobInput }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const job = await updateJobById(Number(id), request.body);

    return reply.send({
      success: true,
      job,
    });
  } catch (error: any) {
    console.log("Job update error:", error.message);

    return reply.status(500).send({
      success: false,
      error: "Failed to update job",
    });
  }
}

export async function deleteJobController(
  request: FastifyRequest<{ Params: JobIdParams }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    await deleteJobById(Number(id));

    return reply.send({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error: any) {
    console.log("Job deletion error:", error.message);

    return reply.status(500).send({
      success: false,
      error: "Failed to delete job",
    });
  }
}