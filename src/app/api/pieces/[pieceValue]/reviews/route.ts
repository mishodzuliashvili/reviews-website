import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params: { pieceValue } }: { params: { pieceValue: string } }
) {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                piece: {
                    value: pieceValue,
                },
            },
            include: {
                tags: true,
                images: true,
                group: true,
                author: true,
                likes: true,
                piece: true,
                rates: true,
            },
        });
        return NextResponse.json(reviews);
    } catch (e: any) {
        return new NextResponse("Could not get reviews.", { status: 500 });
    }
}
