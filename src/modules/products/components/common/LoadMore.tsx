"use client";

import { Button } from "@/src/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function LoadMore({
  length,
  total,
}: {
  length: number;
  total: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const currentLimit = params.get("limit") ?? "";

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const current = new URLSearchParams(params.toString());
      Object.entries(updates).forEach(([key, val]) => {
        if (val === "") current.delete(key);
        else current.set(key, val);
      });
      router.push(`?${current.toString()}`);
    },
    [params, router],
  );
  if (total <= length) return null;
  return (
    <div
      onClick={() =>
        updateParams({ limit: `${(Number(currentLimit) ?? 9) + 9}` })
      }
      className="self-center"
    >
      <Button
        text={"Load More"}
        mode={"outline"}
        rounded={"rounded"}
        disabled={false}
      />
    </div>
  );
}
