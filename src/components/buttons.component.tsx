"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = ({ lang }: any) => {
  return (
    <Link href={`${lang}/login`} style={{ marginRight: 10 }}>
      Sign In
    </Link>
  );
};

export const RegisterButton = ({ lang }: any) => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = ({ lang }: any) => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
