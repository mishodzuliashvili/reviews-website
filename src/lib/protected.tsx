import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { signOut } from "next-auth/react";

export async function redirectIfNotAuthenticated() {
  const session = await getServerSession(authOptions);
  !session && redirect("/api/auth/signin");
}

export async function redirectIfAuthenticated() {
  const session = await getServerSession(authOptions);
  session && redirect("/");
}

export async function redirectIfNotAdmin() {
  const isAdmin = await isUserAdmin();
  !isAdmin && redirect("/");
}

export async function redirectIfBlocked() {
  const isBlocked = await isUserBlocked();
  isBlocked && redirect("/");
}

export async function signOutIfBlocked() {
  const isBlocked = await isUserBlocked();
  isBlocked && signOut();
}

async function isUserAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("User is not authenticated");
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
  });
  return user?.isAdmin;
}

async function isUserBlocked() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("User is not authenticated");
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
  });
  return user?.isBlocked;
}
