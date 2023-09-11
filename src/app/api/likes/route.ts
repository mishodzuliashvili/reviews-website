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
            message: "Like added successfully",
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Like could not be created.",
            },
            { status: 500 }
        );
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
            message: "Like deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Like could not be deleted.",
            },
            { status: 500 }
        );
    }
}
