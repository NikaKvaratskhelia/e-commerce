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

export function useUpdateProfile(data: PutUserSchema) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateProfile(data),
    onError: (err) => toast.error(err.message),
    onSuccess: (data) => toast.error(data.message),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["currentUser"] }),
  });
}
