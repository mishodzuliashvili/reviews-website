import Link from "next/link";
import React from "react";

type layoutProps = {
    children: React.ReactNode;
};

export default function layout({ children }: layoutProps) {
    return (
        <div className="px-5">
            <h3 className="text-xl">
                👋{" "}
                <Link href="/login" className="underline">
                    Sign in
                </Link>{" "}
                for the ability to sort reviews by latest, or top.
            </h3>
            <br />
            {children}
        </div>
    );
}
