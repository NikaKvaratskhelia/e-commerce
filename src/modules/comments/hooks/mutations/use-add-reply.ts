"use client";
import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function postReply(commentId: number, content: string) {
  const res = await client.api.comments.reply[":commentId"].$post({
    json: { content: content },
    param: { commentId: commentId.toString() },
  });

  const response = await res.json();

  if (!res.ok || !response.success) {
    throw new Error(response.message);
  }

  return response;
}

export function useAddReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { content: string; commentId: number }) =>
      postReply(data.commentId, data.content),

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (err) => {
      toast.error(err.message);
    },

    onSettled: (_data, _err, variables) => {
      queryClient.invalidateQueries({ queryKey: ["replies", variables.commentId] });
    },
  });
}
