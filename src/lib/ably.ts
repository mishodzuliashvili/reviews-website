import Ably from "ably";
import { Comment } from "@prisma/client";

const globalForAbly = global as unknown as { ably: Ably.Types.RealtimePromise };

export const ably =
    globalForAbly.ably ||
    new Ably.Realtime.Promise(process.env.NEXT_PUBLIC_ABLY_API_KEY as string);

export async function subscribeAbly(
    channelName: string,
    callback: (data: Comment) => void
) {
    const channel = ably.channels.get(channelName);
    await channel.subscribe("message", (message: { data: Comment }) => {
        callback(message.data);
    });
}

export function publishAbly(channelName: string, data: Comment) {
    const channel = ably.channels.get(channelName);
    channel.publish("message", data);
}

if (process.env.NODE_ENV !== "production") globalForAbly.ably = ably;
