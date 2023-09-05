import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    {
        params: { commentId },
    }: {
        params: { id: string; commentId: string };
    }
) {
    const { text } = await req.json();

    try {
        await prisma.comment.update({
            where: { id: commentId },
            data: { text },
        });

        return NextResponse.json({ msg: "Comment updated successfully" });
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
