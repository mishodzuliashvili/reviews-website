"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Blocked() {
  return (
    <div className="p-5 flex flex-col gap-4 items-center text-center">
      <h1 className="">
        You are blocked from this site, please contact the site administrator
      </h1>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
