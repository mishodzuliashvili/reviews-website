import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const { reviewId, title, item, grade, text, group, tags, images } =
            await request.json();
        const user = await getCurrentUser();
        const userId = user?.id;
        console.log(images);
        await prisma.review.upsert({
            where: {
                id: "",
            },
            create: {
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
            update: {
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
                    set: [],
                    connectOrCreate: tags.map((tag: string) => ({
                        where: { value: tag },
                        create: { value: tag },
                    })),
                },
                images: {
                    deleteMany: {
                        url: {
                            notIn: images,
                        },
                    },
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
        console.log(error);
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
