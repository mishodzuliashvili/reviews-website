import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

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
                likes: true,
                piece: {
                    include: {
                        rates: true,
                    },
                },
                comments: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
        return NextResponse.json(review);
    } catch (e: any) {
        return new NextResponse("Could not get review.", { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params: { id } }: { params: { id: string } }
) {
    try {
        const { data } = await request.json();
        await prisma.review.update({
            where: {
                id: id,
            },
            data: data,
        });
        return NextResponse.json({ msg: "Review updated." });
    } catch (error) {
        return new NextResponse("Could not delete review.", { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params: { id } }: { params: { id: string } }
) {
    try {
        await prisma.review.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json({ msg: "Review deleted." });
    } catch (error) {
        return new NextResponse("Could not delete review.", { status: 500 });
    }
}
