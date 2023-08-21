"use client";
import React, { createContext, useContext, useState } from "react";

const MainContext = createContext({} as {});

export function MainProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);

  return <MainContext.Provider value={{}}>{children}</MainContext.Provider>;
}

export function useMain() {
  return useContext(MainContext);
}
