"use client";

import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function likeComment(commentId: number) {
  const res = await client.api.comments.like[":commentId"].$post({
    param: { commentId: commentId.toString() },
  });

  const response = await res.json();

  if (!res.ok || !response.success) {
    throw new Error(response.message);
  }

  return response;
}

export function useLikeComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: { commentId: number; productId: string }) =>
      likeComment(commentId),

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.productId],
      });
    },
  });
}
