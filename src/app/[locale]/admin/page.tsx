import {
  redirectIfNotAdmin,
  redirectIfNotAuthenticated,
  signOutIfBlocked,
} from "@/lib/protected";

export default async function Admin({
  params: { lang },
}: {
  params: { lang: string };
}) {
  await redirectIfNotAuthenticated();
  await redirectIfNotAdmin();
  await signOutIfBlocked();

  // link of users for now
  return <div>Admin</div>;
}
