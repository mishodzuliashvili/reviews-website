"use client";
import React, { createContext, useContext } from "react";

const MainContext = createContext(
  {} as {
    user: User | null;
  }
);

export function MainProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  return (
    <MainContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export function useMain() {
  return useContext(MainContext);
}
