import { user_role } from "@/generated/prisma/enums";
import { validateRequest } from "./validate";
import { HTTPException } from "hono/http-exception";

export const requireAuth = async () => {
  const { user, session } = await validateRequest();

  if (!user || !session) {
    throw new HTTPException(401, {
      message: "ნგარიშში შესვლის გარეშე ამ ფუნქციას ვერ გამოიყენებ!",
    });
  }

  return { user, session };
};

export const requireRole = async (roles: user_role[]) => {
  const { user, session } = await requireAuth();

  if (!roles.includes(user.role)) {
    throw new HTTPException(403, {
      message: "არ გაქვს უფლება ამ ფუნქციის გამოყენების!",
    });
  }

  return { user, session };
};
