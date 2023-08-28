import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

function changeUsersAdminProperty(userIds: string[], isAdmin: boolean) {
  return prisma.user.updateMany({
    where: {
      id: {
        in: userIds,
      },
    },
    data: {
      isAdmin: isAdmin,
    },
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const { userIds } = (await request.json()) as {
    userIds: string[];
  };
  try {
    const users = await changeUsersAdminProperty(userIds, true)
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Changing users admin property failed." },
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
    const users = await changeUsersAdminProperty(userIds, false)
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Changing users admin property failed." },
      { status: 500 }
    );
  }
}
