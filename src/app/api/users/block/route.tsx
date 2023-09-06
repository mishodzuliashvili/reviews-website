import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function updateUsersByIds(ids: string[], data: { isBlocked: boolean }) {
    return prisma.user.updateMany({
        where: {
            id: {
                in: ids,
            },
        },
        data,
    });
}

export async function POST(request: Request) {
    try {
        const { ids } = await request.json();
        await updateUsersByIds(ids, { isBlocked: true });
        return NextResponse.json({ msg: "Users blocked successfully" });
    } catch (error) {
        return new NextResponse("Changing users blocked property failed.", {
            status: 500,
        });
    }
}

export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        await updateUsersByIds(ids, { isBlocked: false });
        return NextResponse.json({ msg: "Users unblocked successfully" });
    } catch (error) {
        return new NextResponse("Changing users blocked property failed.", {
            status: 500,
        });
    }
}
