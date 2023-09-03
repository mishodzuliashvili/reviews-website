import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export function getUserForClientById(id: string) {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
      registrationTime: true,
      lastLoginTime: true,
      isBlocked: true,
      isAdmin: true,
    },
  });
}

export function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export function updateUserById(
  id: string,
  data: Prisma.UserUpdateArgs["data"]
) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
}
