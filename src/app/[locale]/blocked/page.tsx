"use client";
import { authOptions } from "@/lib/auth";
import {
  redirectIfNotAdmin,
  redirectIfNotAuthenticated,
  signOutIfBlocked,
} from "@/lib/protected";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

export default function Blocked({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div>
      Please sign out,
      <button onClick={() => signOut()}>ssssssssss</button>
    </div>
  );
}
