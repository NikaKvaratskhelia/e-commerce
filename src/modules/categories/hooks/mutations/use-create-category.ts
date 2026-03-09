"use client";

import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { PostCategoryModel } from "../../server/models";
import { postCategorySchema } from "../../server/validators";

async function createCategory(payload: PostCategoryModel) {
  const isValid = postCategorySchema.safeParse(payload);

  if (!isValid) {
    throw new Error("არასწორი ველები.");
  }

  const res = await client.api.categories.$post({
    json: payload,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("კატეგორია წარმატებით დაემატა.");

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
