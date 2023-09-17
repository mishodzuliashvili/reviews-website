"use client";
import MainLoader from "@/components/my-ui/main/MainLoader";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";

type UserContextType = {
    user: Session["user"] | null;
};

const UserContext = createContext<UserContextType>({
    user: null,
});

type UserContextProviderProps = {
    children: React.ReactNode;
};

export default function UserContextProvider({
    children,
}: UserContextProviderProps) {
    const { data: session, status, update } = useSession();
    const user = session?.user ?? null;
    return (
        <UserContext.Provider value={{ user }}>
            {status === "loading" ? <MainLoader /> : children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error(
            "useUserContext must be used within a UserContextProvider"
        );
    }
    return context;
}
