import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: Request) {
    try {
        const { reviewId } = await req.json();
        const user = await getCurrentUser();
        const userId = user?.id as string;
        await prisma.like.create({
            data: {
                reviewId,
                userId,
            },
        });
        return NextResponse.json({
            msg: "Like added successfully",
        });
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { reviewId } = await req.json();
        const user = await getCurrentUser();
        const userId = user?.id as string;
        await prisma.like.delete({
            where: {
                userId_reviewId: {
                    reviewId,
                    userId,
                },
            },
        });
        return NextResponse.json({
            msg: "Like deleted successfully",
        });
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
