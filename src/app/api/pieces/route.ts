import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const pieces = await prisma.piece.findMany({});
        return NextResponse.json(pieces);
    } catch (error) {
        return NextResponse.json(
            {
                error: "Pieces could not be fetched.",
            },
            { status: 500 }
        );
    }
}
