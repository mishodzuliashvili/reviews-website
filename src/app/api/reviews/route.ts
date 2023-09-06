import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const reviews = await prisma.review.findMany({
            include: {
                tags: true,
                images: true,
                group: true,
                author: true,
                likes: true,
                piece: true,
                rates: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json({ reviews });
    } catch (e: any) {
        return new NextResponse("Could not get reviews.", { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { title, item, grade, text, group, tags, images, userId } =
            await request.json();
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
