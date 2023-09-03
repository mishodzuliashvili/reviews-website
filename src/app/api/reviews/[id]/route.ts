import { prisma } from "@/lib/prisma";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: id,
      },
      include: {
        tags: true,
        images: true,
        group: true,
        author: true,
        _count: {
          select: {
            likes: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return NextResponse.json({ review });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Could not get review." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const { data } = (await request.json()) as {
    data: Partial<Review>;
  };
  try {
    const review = await prisma.review.update({
      where: {
        id: id,
      },
      data: data,
    });
    return NextResponse.json({ review });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not delete review." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const review = await prisma.review.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ review });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not delete review." },
      { status: 500 }
    );
  }
}
