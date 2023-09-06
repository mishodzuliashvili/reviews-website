import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type paramsType = { params: { reviewId: string } };

export async function GET(req: Request, { params: { reviewId } }: paramsType) {
    try {
        const comments = await prisma.comment.findMany({
            where: { reviewId },
            orderBy: { createdAt: "asc" },
            include: {
                author: true,
            },
        });
        return NextResponse.json(comments);
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
