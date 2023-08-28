import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

function getAllUsers() {
  return prisma.user.findMany({
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

function deleteUsers (userIds: string[]){
  return prisma.user.deleteMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  try {
    const users = await getAllUsers();
    return NextResponse.json({ users });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Could not fetch users." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const { userIds } = (await request.json()) as {
    userIds: string[];
  };
  try {
    const users = await deleteUsers(userIds);
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(
      { error: "Could not delete users." },
      { status: 500 }
    );
  }
}
