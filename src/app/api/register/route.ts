import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const DEFAULT_IMAGE =
  "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg";
export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Please fill all fields.",
        },
        { status: 400 }
      );
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (userExists) {
      return NextResponse.json(
        {
          error: "User with this email already exists.",
        },
        { status: 400 }
      );
    }
    const hashed_password = await hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
        image: DEFAULT_IMAGE,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
    return NextResponse.json({
      user,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
