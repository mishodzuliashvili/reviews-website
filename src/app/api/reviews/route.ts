import getQueries from "@/lib/getQueries";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const { title, item, grade, text, group, tags, images } =
            await request.json();
        const user = await getCurrentUser();
        const userId = user?.id;
        await prisma.review.create({
            data: {
                title,
                grade,
                text,
                piece: {
                    connectOrCreate: {
                        where: { value: item },
                        create: { value: item },
                    },
                },
                tags: {
                    connectOrCreate: tags.map((tag: string) => ({
                        where: { value: tag },
                        create: { value: tag },
                    })),
                },
                images: {
                    connectOrCreate: images.map((image: string) => ({
                        where: { url: image },
                        create: { url: image },
                    })),
                },
                author: {
                    connect: { id: userId },
                },
                group: {
                    connectOrCreate: {
                        where: { value: group },
                        create: { value: group },
                    },
                },
            },
        });
        return NextResponse.json({ msg: "Review created." });
    } catch (error) {
        return new NextResponse("Could not create reviews.", { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        await prisma.review.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
        return NextResponse.json({ msg: "Reviews deleted" });
    } catch (error) {
        return new NextResponse("Could not delete reviews.", { status: 500 });
    }
}
