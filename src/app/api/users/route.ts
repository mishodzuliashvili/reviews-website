import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      isAdmin: true,
    },
  });
}

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json({ users });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Could not fetch users" },
      { status: 500 }
    );
  }
}
