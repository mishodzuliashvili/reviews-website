"use client";
import { prisma } from "@/lib/prisma";
import { signOut, useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

const MainContext = createContext({} as {});

export function MainProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const { data: session } = useSession();
  useEffect(() => {
    // setLoading(true);
    // (async () => {
    //   if (session) {
    //     await fetch("/api/users/" + session?.user?.email, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //       .then((res) => {
    //         if (!res.ok) signOut();
    //         return res.json();
    //       })
    //       .then(({ user }) => {
    //         console.log(user);
    //         if (user?.isBlocked) signOut();
    //         else setUser(user);
    //       });
    //   }
    //   setLoading(false);
    // })();
  }, [session]);

  return (
    <MainContext.Provider value={{}}>
      {loading ? <div>Loading...</div> : children}
    </MainContext.Provider>
  );
}

export function useMain() {
  return useContext(MainContext);
}
