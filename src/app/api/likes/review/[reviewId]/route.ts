import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type paramsType = { params: { reviewId: string } };

export async function GET(req: Request, { params: { reviewId } }: paramsType) {
    try {
        const likes = await prisma.like.findMany({
            where: { reviewId },
        });
        return NextResponse.json(likes);
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
