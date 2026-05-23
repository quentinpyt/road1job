import { prisma } from "../../../lib/prisma";

export type ProfileUpdateInput = {
  name?: string;
  surname?: string;
  age?: number;
  address?: string;
};

export const userProfileSelect = {
  id: true,
  email: true,
  name: true,
  surname: true,
  age: true,
  address: true,
  Schools: true,
  Projects: true,
  Technologies: true,
  Skills: true,
  createdAt: true,
} as const;

export async function findAllUsers() {
  return prisma.user.findMany();
}

export async function findUserProfileById(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: userProfileSelect,
  });
}

export async function updateUserProfileById(
  userId: number,
  data: ProfileUpdateInput,
) {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: userProfileSelect,
  });
}