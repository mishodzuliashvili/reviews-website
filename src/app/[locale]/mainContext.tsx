"use client";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(
  {} as {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  }
);

export function UserProvider({
  children,
  user: tUser,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [user, setUser] = useState(tUser);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
