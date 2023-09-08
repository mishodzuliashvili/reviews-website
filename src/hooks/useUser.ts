import { useSession } from "next-auth/react";

export default function useUser() {
    const { data: session, status, update } = useSession();
    const user = session?.user;
    const isLoading = status === "loading";
    const isAuth = !!user;
    const isAdmin = user?.isAdmin;
    return { user, isLoading, isAuth, update, isAdmin };
}
