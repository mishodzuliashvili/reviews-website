import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import React from "react";

type layoutProps = {
    children: React.ReactNode;
};

export default async function layout({ children }: layoutProps) {
    const user = await getCurrentUser();

    return (
        <div className="px-5 pb-10">
            {/* {!user && (
                <>
                    <h3 className="text-xl mb-3">
                        👋{" "}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>{" "}
                        for the ability to sort reviews by latest, or top.
                    </h3>
                </>
            )} */}
            {children}
        </div>
    );
}
