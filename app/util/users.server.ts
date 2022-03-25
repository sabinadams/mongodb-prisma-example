import { prisma, Profile } from "./db.server";

export const getOtherUsers = async (userId: string) => {
  return await prisma.user.findMany({
    select: {
      id: true,
      profile: true,
    },
    where: {
      id: { not: userId },
    },
  });
};

export const updateUser = async (userId: string, profile: Partial<Profile>) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      profile: {
        update: profile,
      },
    },
  });
};

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    select: {
      id: true,
      profile: true,
    },
    where: {
      id: userId,
    },
  });
};
