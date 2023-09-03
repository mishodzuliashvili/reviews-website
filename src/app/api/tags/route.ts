import { prisma } from "@/lib/prisma";
import { Tag } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tags = await prisma.tag.findMany();
    return NextResponse.json({ tags });
  } catch (e: any) {
    return NextResponse.json({ error: "Could not get tags." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { tagsData } = (await request.json()) as {
      tagsData: Tag[];
    };
    const tags = await prisma.tag.createMany({
      data: tagsData,
      skipDuplicates: true,
    });
    return NextResponse.json({ tags });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not create tags." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { values } = (await request.json()) as {
      values: string[];
    };
    const tags = await prisma.tag.deleteMany({
      where: {
        value: {
          in: values,
        },
      },
    });
    return NextResponse.json({ tags });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not delete tags." },
      { status: 500 }
    );
  }
}
