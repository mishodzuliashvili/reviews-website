import { authOptions } from "@/lib/auth";
import {
  redirectIfNotAdmin,
  redirectIfNotAuthenticated,
  signOutIfBlocked,
} from "@/lib/protected";
import { getServerSession } from "next-auth";

export default async function Admin({
  params: { lang },
}: {
  params: { lang: string };
}) {
  // await redirectIfNotAuthenticated();
  // await redirectIfNotAdmin();
  // await signOutIfBlocked();
  const session = await getServerSession(authOptions);
  // link of users for now
  return <div>Admin, {session?.user?.email}</div>;
}
