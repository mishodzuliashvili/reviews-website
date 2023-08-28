import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

function getUser(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isAdmin: true,
      isBlocked: true,
      image: true,
      lastLoginTime: true,
      registrationTime: true,
    },
  });
}

function deleteUser(id: string){
  return prisma.user.delete({
    where: {
      id,
    },
  });
}
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  try {
    const user = await getUser(params.id);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not fetch user." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  try {
    let user = await getUser(params.id);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    user = await deleteUser(params.id);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not delete user." },
      { status: 500 }
    );
  }
}
