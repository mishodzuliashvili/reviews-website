import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

function getUser(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isAdmin: true,
    },
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    );
  } else {
    try {
      // TODO: say sessions that user email exists always
      const user = await getUser(session.user?.email || "");
      return NextResponse.json({ user });
    } catch (e: any) {
      return NextResponse.json(
        { error: "Could not fetch user." },
        { status: 500 }
      );
    }
  }
}
