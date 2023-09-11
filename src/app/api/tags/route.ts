import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const tags = await prisma.tag.findMany();
        return NextResponse.json(tags);
    } catch (e: any) {
        return NextResponse.json(
            {
                error: "Tags could not be fetched.",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { data } = await request.json();
        await prisma.tag.createMany({
            data: data,
            skipDuplicates: true,
        });
        return NextResponse.json({ message: "Tags added successfully" });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Tags could not be added.",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { values } = await request.json();
        await prisma.tag.deleteMany({
            where: {
                value: {
                    in: values,
                },
            },
        });
        return NextResponse.json({ message: "Tags deleted successfully" });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Tags could not be deleted.",
            },
            { status: 500 }
        );
    }
}
