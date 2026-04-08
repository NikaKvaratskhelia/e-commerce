"use client";

import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function deleteProduct(id: number | string) {
  const res = await client.api.products[":id"].$delete({
    param: { id: String(id) },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      toast.success("პროდუქტი წარმატებით წაიშალა.");

      await queryClient.invalidateQueries({
        queryKey: ["adminProducts"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
