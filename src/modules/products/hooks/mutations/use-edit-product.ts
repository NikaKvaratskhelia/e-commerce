"use client";

import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { putProductSchema, PutProductModel } from "../../server/validators";

type UpdateCategoryVariables = {
  id: number;
  payload: PutProductModel;
};

async function updateProduct({ id, payload }: UpdateCategoryVariables) {
  const isValid = putProductSchema.safeParse(payload);

  if (!isValid.success) {
    throw new Error("არასწორი ველები.");
  }

  const res = await client.api.products[":id"].$put({
    param: { id: String(id) },
    json: payload,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data.data;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success("პროდუქტი წარმატებით განახლდა.");

      queryClient.invalidateQueries({
        queryKey: ["adminProducts"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
