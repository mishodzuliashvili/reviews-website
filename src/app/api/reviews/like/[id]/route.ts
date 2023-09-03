import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id } = (await request.json()) as {
    id: string;
  };
  const session = await getServerSession(authOptions);
  try {
    const like = await prisma.like.create({
      data: {
        userId: (session as UserSession).userId,
        reviewId: id,
      },
    });
    return NextResponse.json({ like });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not like review." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { id } = (await request.json()) as {
    id: string;
  };
  const session = await getServerSession(authOptions);
  try {
    const like = await prisma.like.delete({
      where: {
        userId_reviewId: {
          reviewId: id,
          userId: (session as UserSession).userId,
        },
      },
    });
    return NextResponse.json({ like });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not deslike review." },
      { status: 500 }
    );
  }
}
