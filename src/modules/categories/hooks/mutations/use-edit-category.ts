"use client";

import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { PutCategoryModel } from "../../server/models";
import { putCategorySchema } from "../../server/validators";

type UpdateCategoryVariables = {
  id: number;
  payload: PutCategoryModel;
};

async function updateCategory({ id, payload }: UpdateCategoryVariables) {
  const isValid = putCategorySchema.safeParse(payload);

  if (!isValid.success) {
    throw new Error("არასწორი ველები.");
  }

  const res = await client.api.categories[":id"].$put({
    param: { id: String(id) },
    json: payload,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data.data;
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("კატეგორია წარმატებით განახლდა.");

      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
