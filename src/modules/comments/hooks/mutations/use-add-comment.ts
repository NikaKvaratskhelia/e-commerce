"use client";
import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function postComment(
  productId: string,
  data: { content: string; rating: number },
) {
  const res = await client.api.comments[":productId"].$post({
    param: { productId },
    json: data,
  });

  const response = await res.json();
  if (!res.ok || !response.success) {
    throw new Error(response.message);
  }

  return response;
}

export function useAddComment(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { content: string; rating: number }) =>
      postComment(productId, data),

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (err) => {
      toast.error(err.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
}
