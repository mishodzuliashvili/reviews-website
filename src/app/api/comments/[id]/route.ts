import { prisma } from "@/lib/prisma";
import { createCommentSchema } from "@/lib/validations/comments";
import { NextResponse } from "next/server";

type paramsType = { params: { id: string } };

export async function PUT(req: Request, { params: { id } }: paramsType) {
    try {
        const { text } = await req.json();
        createCommentSchema.parse({ text });
        await prisma.comment.update({
            where: { id },
            data: { text },
        });
        return NextResponse.json({ message: "Comment updated successfully" });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Comment could not be updated.",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params: { id } }: paramsType) {
    try {
        await prisma.comment.delete({
            where: {
                id,
            },
        });
        return NextResponse.json({ message: "Comment deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Comment could not be deleted.",
            },
            { status: 500 }
        );
    }
}
