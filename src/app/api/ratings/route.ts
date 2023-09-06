import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: Request) {
    try {
        const { reviewId, value } = await req.json();
        const user = await getCurrentUser();
        const userId = user?.id as string;
        console.log(userId, reviewId, value);
        await prisma.rate.upsert({
            where: {
                userId_reviewId: {
                    reviewId,
                    userId,
                },
            },
            update: {
                value,
            },
            create: {
                reviewId,
                userId,
                value,
            },
        });
        return NextResponse.json({
            msg: "Raiting added successfully",
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
        await prisma.rate.delete({
            where: {
                userId_reviewId: {
                    reviewId,
                    userId,
                },
            },
        });
        return NextResponse.json({
            msg: "Raiting deleted successfully",
        });
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
