import getQueries from "@/lib/getQueries";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type paramsType = { params: { reviewId: string } };

export async function GET(req: Request, { params: { reviewId } }: paramsType) {
    const { take, skip } = getQueries(req, ["take", "skip"]);
    try {
        const comments = await prisma.comment.findMany({
            where: { reviewId },
            orderBy: { createdAt: "asc" },
            include: {
                author: true,
            },
            ...(skip && { skip: Number(skip) }),
            ...(take && { take: Number(take) }),
        });
        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json(
            {
                error: "Comments could not be fetched.",
            },
            { status: 500 }
        );
    }
}
