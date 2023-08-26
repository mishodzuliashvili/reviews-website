import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";

export default async function Admin({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getServerSession(authOptions);
  return <div>Admin, {session?.user?.email}</div>;
}
