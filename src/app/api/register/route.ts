import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const DEFAULT_IMAGE = "/images/profile.png";
export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return new NextResponse("Please fill all fields.", {
                status: 400,
            });
        }
        const userExists = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (userExists) {
            return new NextResponse("User with this email already exists.", {
                status: 400,
            });
        }
        const hashed_password = await hash(password, 12);
        await prisma.user.create({
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
            msg: "User created successfully",
        });
    } catch (error: any) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
