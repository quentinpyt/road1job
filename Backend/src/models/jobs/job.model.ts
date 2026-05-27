import { prisma } from "../../../lib/prisma";

export type CreateJobInput = {
  name: string;
  descriptionmini?: string;
  description: string;
  company: string;
  type: string;
  experience?: number | null;
};

export type UpdateJobInput = Partial<CreateJobInput>;

export type SearchJobsInput = {
  word: string;
  limit?: number;
};

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

export async function searchJobsByWord({ word, limit = 12 }: SearchJobsInput) {
  const normalizedWord = word.trim();

  if (!normalizedWord) {
    return findAllJobs(limit);
  }

  return prisma.job.findMany({
    take: limit,
    where: {
      OR: [
        { name: { contains: normalizedWord, mode: "insensitive" } },
        { descriptionmini: { contains: normalizedWord, mode: "insensitive" } },
        { description: { contains: normalizedWord, mode: "insensitive" } },
        { company: { contains: normalizedWord, mode: "insensitive" } },
        { type: { contains: normalizedWord, mode: "insensitive" } },
      ],
    },
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

export async function getAllSkills() {
  const skills = await prisma.skills.findMany({
    where: {
      name: {
        not: null,
      },
    },
    select: {
      id: true,
      name: true,
    },
    distinct: ["name"],
  });

  return skills.filter((skill) => skill.name).map((skill) => ({
    id: skill.id,
    name: skill.name!,
  }));
}

export async function createJob(data: CreateJobInput) {
  return prisma.job.create({
    data: {
      ...data,
      descriptionmini: data.descriptionmini ?? data.description,
    },
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

export async function getTopSkills(limit = 20) {
  const skills = await prisma.skills.groupBy({
    by: ["name"],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
    take: limit,
    where: {
      name: {
        not: null,
      },
    },
  });

  return skills
    .filter((skill) => skill.name)
    .map((skill) => ({
      name: skill.name!,
      count: skill._count.id,
    }));
}
