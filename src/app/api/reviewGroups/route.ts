import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const reviewGroups = await prisma.reviewGroup.findMany({});
        return NextResponse.json(reviewGroups);
    } catch (error) {
        return new NextResponse("Could not get review groups.", {
            status: 500,
        });
    }
}
