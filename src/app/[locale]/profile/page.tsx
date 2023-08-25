import { redirectIfNotAuthenticated, signOutIfBlocked } from "@/lib/protected";

export default async function Profile({
  params: { lang },
}: {
  params: { lang: string };
}) {
  await redirectIfNotAuthenticated();
  await signOutIfBlocked();

  return <div>Profile</div>;
}
