import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params: { id } }: { params: { id: string } }
) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                image: true,
                email: true,
                registrationTime: true,
                lastLoginTime: true,
                isBlocked: true,
                isAdmin: true,
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            {
                error: "User could not be fetched.",
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
        const { name } = await request.json();
        await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name,
            },
        });

        return NextResponse.json({ message: "User updated." });
    } catch (error) {
        return NextResponse.json(
            {
                error: "User could not be updated.",
            },
            { status: 500 }
        );
    }
}
