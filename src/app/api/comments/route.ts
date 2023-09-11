import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { publishAbly } from "@/lib/ably";
import { createCommentSchema } from "@/lib/validations/comments";

function doesReviewExist(reviewId: string) {
    return prisma.review.findUnique({
        where: { id: reviewId },
    });
}

export async function POST(req: Request) {
    try {
        const { text, reviewId } = await req.json();
        createCommentSchema.parse({ text });
        if (!doesReviewExist(reviewId)) {
            return NextResponse.json(
                {
                    error: "Review not found",
                },
                { status: 404 }
            );
        }
        const user = await getCurrentUser();
        const authorId = user?.id as string;
        const comment = await prisma.comment.create({
            data: {
                text,
                authorId,
                reviewId,
            },
        });
        publishAbly(reviewId, comment);
        return NextResponse.json(
            {
                message: "Comment added successfully",
                commentId: comment.id,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: "Comment could not be created.",
            },
            { status: 500 }
        );
    }
}
