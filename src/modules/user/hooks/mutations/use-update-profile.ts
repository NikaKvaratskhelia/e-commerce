"use client";

import { client } from "@/src/library/hono-client";
import { PutUserSchema } from "../../server/validations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function updateProfile(formData: PutUserSchema) {
  const res = await client.api.user.$put({ json: formData });
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PutUserSchema) => updateProfile(data),
    onError: (err) => toast.error(err.message),
    onSuccess: (data) => toast.success(data.message),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
