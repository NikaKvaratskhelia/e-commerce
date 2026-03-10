"use client";

import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function deleteBlog(id: number | string) {
  const res = await client.api.blogs[":id"].$delete({
    param: { id: String(id) },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: async () => {
      toast.success("ბლოგი წარმატებით წაიშალა.");

      await queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
