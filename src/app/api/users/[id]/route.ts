import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
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
  return NextResponse.json({ user });
}

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     let user = await getUserById(params.id);
//     if (!user) {
//       return NextResponse.json({ error: "User not found." }, { status: 404 });
//     }
//     user = await prisma.user.delete({
//       where: {
//         id: params.id,
//       },
//     });
//     return NextResponse.json({ user });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Could not delete user." },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { name } = (await request.json()) as {
//     name: string;
//   };
//   try {
//     let user = await getUserById(params.id);
//     if (!user) {
//       return NextResponse.json({ error: "User not found." }, { status: 404 });
//     }
//     user = await prisma.user.update({
//       where: {
//         id: params.id,
//       },
//       data: {
//         name,
//       },
//     });
//     return NextResponse.json({ user });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Could not update user." },
//       { status: 500 }
//     );
//   }
// }
