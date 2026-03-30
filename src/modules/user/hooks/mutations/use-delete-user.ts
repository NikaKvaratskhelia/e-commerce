"use client";

import { User } from "@/generated/prisma/browser";
import { client } from "@/src/library/hono-client";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function deleteUser(userId: string) {
  const res = await client.api.user[":userId"].$delete({
    param: { userId },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useDeleteUser(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteUser(userId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers = queryClient.getQueryData<ApiResponse<User[]>>([
        "users",
      ]);

      queryClient.setQueryData<ApiResponse<User[]>>(["users"], (old) => {
        if (!old?.data) return old;

        return {
          ...old,
          data: old.data.filter((u) => u.id !== userId),
        };
      });

      return { previousUsers };
    },

    onError: (error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }

      toast.error(error.message);
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
}
