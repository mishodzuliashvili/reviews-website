import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (e: any) {
        return new NextResponse("Could not get users.", { status: 500 });
    }
}
// TODO: start from here refactoring
// 1. users
// 2. reviews
// 3. comments
// and see how can we manage with server side components
// maybe add enfpoint for reviwgroups and images
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
        return NextResponse.json({ msg: "Users deleted." });
    } catch (error) {
        return new NextResponse("Something went wrong.", { status: 500 });
    }
}
