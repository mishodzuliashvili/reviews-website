import { redirectIfNotAuthenticated, signOutIfBlocked } from "@/lib/protected";

export default async function Profile({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return <div>Profile</div>;
}
