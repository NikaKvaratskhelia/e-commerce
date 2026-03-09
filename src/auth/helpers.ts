import { user_role } from "@/generated/prisma/enums";
import { validateRequest } from "./validate";

export const requireAuth = async () => {
  const { user, session } = await validateRequest();

  if (!user || !session) throw new Error("Unauthorized");

  return { user, session };
};

export const requireRole = async (role: user_role[]) => {
  const { user, session } = await validateRequest();

  if (!user || !session) throw new Error("Unauthorized");

  if (!role.includes(user.role)) throw new Error("Unauthorized");

  return { user, session };
};
