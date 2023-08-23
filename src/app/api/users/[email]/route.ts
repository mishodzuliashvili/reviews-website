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
    },
  });
}

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    const user = await getUser(params.email);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 500 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not fetch user." },
      { status: 500 }
    );
  }
}
