import { prisma } from "../../../lib/prisma";

export type CreateJobInput = {
  name: string;
  description: string;
  company: string;
  type: string;
  experience?: number | null;
};

export type UpdateJobInput = Partial<CreateJobInput>;

const jobListInclude = {
  salary: true,
  skills: true,
  geolocation: true,
} as const;

const jobDetailInclude = {
  salary: true,
  skills: true,
  geolocation: true,
  analytics: true,
} as const;

export async function findAllJobs(limit = 12) {
  return prisma.job.findMany({
    take: limit,
    include: jobListInclude,
  });
}

export async function findJobById(id: number) {
  return prisma.job.findUnique({
    where: {
      id,
    },
    include: jobDetailInclude,
  });
}

export async function createJob(data: CreateJobInput) {
  return prisma.job.create({
    data,
  });
}

export async function updateJobById(id: number, data: UpdateJobInput) {
  return prisma.job.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteJobById(id: number) {
  return prisma.job.delete({
    where: {
      id,
    },
  });
}