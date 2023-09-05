import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// TODO: get tags by searching and autocomplete for optimization
export async function GET() {
    try {
        const tags = await prisma.tag.findMany();
        return NextResponse.json(tags);
    } catch (e: any) {
        return NextResponse.json("Something went wrong", { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { data } = await request.json();
        await prisma.tag.createMany({
            data: data,
            skipDuplicates: true,
        });
        return NextResponse.json({ msg: "Tags added successfully" });
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
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
        return NextResponse.json({ msg: "Tags deleted successfully" });
    } catch (error) {
        return NextResponse.json("Could not delete tags.", { status: 500 });
    }
}
