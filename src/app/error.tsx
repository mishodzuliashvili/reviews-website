"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col mt-28 items-center gap-3">
      <h2>{error.message}</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
