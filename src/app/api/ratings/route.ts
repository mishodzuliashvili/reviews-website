import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: Request) {
    try {
        const { pieceValue, value } = await req.json();
        const user = await getCurrentUser();
        const userId = user?.id as string;
        await prisma.rate.upsert({
            where: {
                userId_pieceValue: {
                    pieceValue,
                    userId,
                },
            },
            update: {
                value,
            },
            create: {
                pieceValue,
                userId,
                value,
            },
        });
        return NextResponse.json({
            message: "Raiting added successfully",
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Raiting could not be created.",
            },
            { status: 500 }
        );
    }
}
