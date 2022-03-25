import bcrypt from "bcryptjs";
import { prisma, Profile } from "./db.server";
import { RegisterForm } from "./interfaces";

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

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
  });
  return { id: newUser.id, email: user.email };
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
