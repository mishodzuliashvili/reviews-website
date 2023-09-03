import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function updateUsersByIds(ids: string[], data: { isBlocked: boolean }) {
  return prisma.user.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data,
  });
}

export async function POST(request: Request) {
  const { ids } = (await request.json()) as {
    ids: string[];
  };
  try {
    const users = await updateUsersByIds(ids, { isBlocked: true });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Changing users blocked property failed." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { ids } = (await request.json()) as {
    ids: string[];
  };
  try {
    const users = await updateUsersByIds(ids, { isBlocked: false });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Changing users blocked property failed." },
      { status: 500 }
    );
  }
}
