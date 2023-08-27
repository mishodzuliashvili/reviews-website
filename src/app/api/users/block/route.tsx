import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const { userIds } = (await request.json()) as {
    userIds: string[];
  };
  try {
    const users = await prisma.user.updateMany({
      where: {
        id: {
          in: userIds,
        },
      },
      data: {
        isBlocked: true,
      },
    });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not fetch user." },
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
    const users = await prisma.user.updateMany({
      where: {
        id: {
          in: userIds,
        },
      },
      data: {
        isBlocked: false,
      },
    });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not fetch user." },
      { status: 500 }
    );
  }
}
