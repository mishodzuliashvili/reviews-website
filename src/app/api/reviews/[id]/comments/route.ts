import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(
    req: Request,
    { params: { id } }: { params: { id: string } }
) {
    const { text } = await req.json();
    const user = await getCurrentUser();
    try {
        const data = await prisma.comment.create({
            data: {
                text,
                authorId: user?.id as string,
                reviewId: id,
            },
        });

        return NextResponse.json({
            msg: "Comment added successfully",
            commentId: data.id,
        });
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
