import { useTranslations } from "next-intl";

async function getUser() {
  const res = await fetch(
    "http://localhost:3000/api/users/cllsh2uq40000lc08sjkeo3rx3dsds"
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const { user } = await res.json();
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export default async function Home() {
  const res = await getUser();

  return <main></main>;
}
