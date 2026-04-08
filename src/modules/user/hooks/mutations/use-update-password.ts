"use client";

import { client } from "@/src/library/hono-client";
import { PasswordSchema } from "../../server/validations";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

async function updatePassword(formData: PasswordSchema) {
  const res = await client.api.user.passowrd.$put({ json: formData });
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function UseUpdatePassword() {
  return useMutation({
    mutationFn: async (data: PasswordSchema) => updatePassword(data),
    onError: (err) => toast.error(err.message),
    onSuccess: (data) => toast.success(data.message),
  });
}
