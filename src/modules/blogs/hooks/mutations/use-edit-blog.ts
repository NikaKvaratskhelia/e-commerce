"use client";

import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PutBlogSchema, putBlogSchema } from "../../server/validations";

type UpdateCategoryVariables = {
  id: number;
  payload: PutBlogSchema;
};

async function updateBlog({ id, payload }: UpdateCategoryVariables) {
  const isValid = putBlogSchema.safeParse(payload);

  if (!isValid.success) {
    throw new Error("არასწორი ველები.");
  }

  const res = await client.api.blogs[":id"].$put({
    param: { id: String(id) },
    json: payload,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data.data;
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      toast.success("ბლოგი წარმატებით განახლდა.");

      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
