"use client";

import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

export type CommentReplyDto = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string | null;
    username: string | null;
  };
};

async function getReplies(commentId: number): Promise<CommentReplyDto[]> {
  const res = await client.api.comments[":commentId"].replies.$get({
    param: { commentId: commentId.toString() },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data.data ?? [];
}

export function useReplies(commentId: number, enabled = true) {
  return useQuery({
    queryKey: ["replies", commentId],
    queryFn: () => getReplies(commentId),
    enabled,
    staleTime: 30_000,
  });
}
