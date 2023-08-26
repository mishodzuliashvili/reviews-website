import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      accounts: true,
    },
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  try {
    const users = await getUsers();
    return NextResponse.json({ users });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Could not fetch users." },
      { status: 500 }
    );
  }
}
