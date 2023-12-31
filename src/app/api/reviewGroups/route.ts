import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const reviewGroups = await prisma.reviewGroup.findMany({});
        return NextResponse.json(reviewGroups);
    } catch (error) {
        return NextResponse.json(
            {
                error: "Review groups could not be fetched.",
            },
            { status: 500 }
        );
    }
}
