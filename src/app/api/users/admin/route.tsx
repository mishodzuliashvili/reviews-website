import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function updateUsersByIds(ids: string[], data: { isAdmin: boolean }) {
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
        await updateUsersByIds(ids, { isAdmin: true });
        return NextResponse.json({ msg: "Users admined successfully" });
    } catch (error) {
        return new NextResponse("Changing users admin property failed.", {
            status: 500,
        });
    }
}

export async function DELETE(request: Request) {
    try {
        const { ids } = await request.json();
        await updateUsersByIds(ids, { isAdmin: false });
        return NextResponse.json({ msg: "Users unadmined successfully" });
    } catch (error) {
        return new NextResponse("Changing users admin property failed.", {
            status: 500,
        });
    }
}
