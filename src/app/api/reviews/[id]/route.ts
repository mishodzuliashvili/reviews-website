import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { reviewInclude } from "../route";
import { getCurrentUser } from "@/lib/session";
export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params: { id } }: { params: { id: string } }
) {
    try {
        const review = await prisma.review.findUnique({
            where: {
                id: id,
            },
            include: reviewInclude,
        });
        return NextResponse.json(review);
    } catch (e: any) {
        return NextResponse.json(
            {
                error: "Review could not be fetched.",
            },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params: { id } }: { params: { id: string } }
) {
    try {
        const { title, item, grade, text, group, tags, images } =
            await request.json();
        const user = await getCurrentUser();
        const userId = user?.id;
        await prisma.review.update({
            where: {
                id: id,
            },
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
        return NextResponse.json({ message: "Review updated." });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Review could not be updated.",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params: { id } }: { params: { id: string } }
) {
    try {
        await prisma.review.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json({ msg: "Review deleted." });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Review could not be deleted.",
            },
            { status: 500 }
        );
    }
}
