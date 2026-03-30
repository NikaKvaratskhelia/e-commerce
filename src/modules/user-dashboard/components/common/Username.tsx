"use client";

import { useCurrentUser } from "@/src/modules/user/hooks/queries/use-current-user";

export default function Username() {
  const { data } = useCurrentUser();
  
  return (
    <h2 className="text-center w-full text-[20px] leading-8 font-semibold">
      {data?.data?.username}
    </h2>
  );
}
