"use client";

import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postBlogSchema, PostBlogSchema } from "../../server/validations";

async function createBlog(payload: PostBlogSchema) {
  const isValid = postBlogSchema.safeParse(payload);

  if (!isValid.success) {
    throw new Error("არასწორი ველები.");
  }

  const res = await client.api.blogs.$post({
    json: payload,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      toast.success("ბლოგი წარმატებით დაემატა.");

      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
