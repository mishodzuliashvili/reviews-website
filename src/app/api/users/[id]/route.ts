import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
        return new NextResponse("Could not get user.", {
            status: 500,
        });
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

        return NextResponse.json({ msg: "User updated." });
    } catch (error) {
        return new NextResponse("Could not update user.", {
            status: 500,
        });
    }
}
