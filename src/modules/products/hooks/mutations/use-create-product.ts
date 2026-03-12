"use client";

import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postProductSchema, PostProductModel } from "../../server/validators";

async function createProduct(payload: PostProductModel) {
  const isValid = postProductSchema.safeParse(payload);

  if (!isValid.success) {
    throw new Error("არასწორი ველები.");
  }

  const res = await client.api.products.$post({
    json: payload,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("პროდუქტი წარმატებით დაემატა.");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
