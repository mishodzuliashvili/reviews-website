import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Could not get users." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { ids } = (await request.json()) as {
    ids: string[];
  };
  try {
    const users = await prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not delete users." },
      { status: 500 }
    );
  }
}
