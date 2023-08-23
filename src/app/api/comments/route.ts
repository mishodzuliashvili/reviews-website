import { NextResponse } from "next/server";
import Ably from "ably";
import { prisma } from "@/lib/prisma";

const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY || "");

(async () => {
  await ably.connection.once("connected");
  console.log("Connected to Ably!");
})();

function createComment() {
  // return prisma.comment.create({
  //   data: {
  //     text: "ragaca commentari",
  //     author: {
  //       connect: {
  //         id: "123",
  //       },
  //     },
  //     review: {
  //       connect: {
  //         id: "123",
  //       },
  //     },
  //   },
  // });
  return {};
}

export async function POST() {
  try {
    // check if data is valid
    // 1. create comment based on reviewID
    const comment = await createComment();
    // 2. send comment
    const reviewID = "123";
    const channel = ably.channels.get("review-" + reviewID);
    await channel.publish("comment", comment);
    return NextResponse.json({
      comment,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Could not create comment." },
      { status: 500 }
    );
  }
}
