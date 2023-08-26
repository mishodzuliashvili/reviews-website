"use client";
import MainError from "@/components/my-ui/MainError";
import MainLoader from "@/components/my-ui/MainLoader";
import { prisma } from "@/lib/prisma";
import { signOut, useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

const MainContext = createContext(
  {} as {
    user: User | null;
  }
);

export function MainProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const { data: session, status: sessionStatus } = useSession();
  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${(session as any)?.userId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUser(data.user);
      setError(null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") fetchUser();
    if (sessionStatus === "unauthenticated") {
      setUser(null);
      setLoading(false);
    }
    // sometimes user is lost on refresh
  }, [sessionStatus]);

  return (
    <MainContext.Provider
      value={{
        user,
      }}
    >
      {error && <MainError error={error} />}
      {!error && loading && <MainLoader />}
      {!error && !loading && children}
    </MainContext.Provider>
  );
}

export function useMain() {
  return useContext(MainContext);
}
