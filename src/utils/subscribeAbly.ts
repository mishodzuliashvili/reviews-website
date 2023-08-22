import Ably from "ably";

export default async function subscribeAbly(callback: (data: any) => void) {
  const ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY || "");
  await ably.connection.once("connected");
  const channel = ably.channels.get("chat");
  await channel.subscribe("message", (message: { data: any }) => {
    callback(message.data);
  });
}

// ! server side ably

// const ably = new Ably.Realtime.Promise(
//   ""
// );

// (async () => {
//   await ably.connection.once("connected");
//   console.log("Connected to Ably!");
// })();

// ? when creating a new message
// async function publishMessage(message: Message) {
//   const channel = ably.channels.get("chat");
//   await channel.publish("message", message);
// }
