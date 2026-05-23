import { prisma } from "../../../lib/prisma";

export type AuthUserInput = {
  firstname?: string;
  name?: string;
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  email: string;
  passwordhash: string;
  name: string | null;
  surname: string | null;
};

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function createUser(data: {
  email: string;
  passwordhash: string;
  name: string;
  surname: string;
}) {
  return prisma.user.create({
    data,
  });
}