import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { publishAbly } from "@/lib/ably";

export async function POST(req: Request) {
    try {
        const { text, reviewId } = await req.json();
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
        return NextResponse.json({
            msg: "Comment added successfully",
        });
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
