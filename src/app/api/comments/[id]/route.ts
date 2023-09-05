import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type paramsType = { params: { id: string } };

export async function PUT(req: Request, { params: { id } }: paramsType) {
    try {
        const { text } = await req.json();
        await prisma.comment.update({
            where: { id },
            data: { text },
        });

        return NextResponse.json({ msg: "Comment updated successfully" });
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: paramsType) {
    const { id } = params;
    try {
        await prisma.comment.delete({
            where: {
                id,
            },
        });
        return NextResponse.json({ msg: "Comment deleted successfully" });
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
