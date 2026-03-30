"use client";

import { client } from "@/src/library/hono-client";
import { UsersListType } from "@/src/modules/user/server/routes";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function updateRole(userId: string) {
  const res = await client.api.user.role[":userId"].$put({
    param: {
      userId,
    },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => updateRole(userId),

    onMutate: async (userId: string) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers = queryClient.getQueryData<
        ApiResponse<UsersListType[]>
      >(["users"]);

      queryClient.setQueryData<ApiResponse<UsersListType[]>>(
        ["users"],
        (old) => {
          if (!old?.data) return old;

          return {
            ...old,
            data: old.data.map((user) =>
              user.id === userId
                ? {
                    ...user,
                    role: user.role === "admin" ? "user" : "admin",
                  }
                : user,
            ),
          };
        },
      );

      return { previousUsers };
    },

    onError: (_error, _userId, context) => {
      toast.error(_error.message);
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },

    onSuccess:(data)=>{
      toast.success(data.message);},

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
