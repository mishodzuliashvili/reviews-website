import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                isAdmin: true,
                isBlocked: true,
                registrationTime: true,
                lastLoginTime: true,
                emailVerified: true,
                image: true,
            },
        });
        return NextResponse.json(users);
    } catch (e: any) {
        return NextResponse.json(
            {
                error: "Users could not be fetched.",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        await prisma.user.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
        return NextResponse.json({ message: "Users deleted." });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Users could not be deleted.",
            },
            { status: 500 }
        );
    }
}
