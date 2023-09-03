import { prisma } from "@/lib/prisma";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
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
      },
      take: 10,
      skip: 0,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ reviews });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Could not get reviews." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { reviewData } = (await request.json()) as {
      reviewData: Review;
    };
    const review = await prisma.review.create({
      data: reviewData,
    });
    return NextResponse.json({ review });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not create reviews." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { ids } = (await request.json()) as {
    ids: string[];
  };
  try {
    const reviews = await prisma.review.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not delete reviews." },
      { status: 500 }
    );
  }
}
