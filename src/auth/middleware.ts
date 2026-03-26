import { createMiddleware } from "hono/factory";
import { Session, User } from "lucia";

import { requireAuth, requireRole } from "./helpers";
import { user_role } from "@/generated/prisma/enums";

interface IContext {
  Variables: {
    user: User;
    session: Session;
  };
}

export const requireAuthMiddleware = () => {
  return createMiddleware<IContext>(async (c, next) => {
    const { user, session } = await requireAuth();

    c.set("user", user);
    c.set("session", session);

    await next();
  });
};

export const requireRoleMiddleware = (roles: user_role[]) => {
  return createMiddleware<IContext>(async (c, next) => {
    const { user, session } = await requireRole(roles);

    c.set("user", user);
    c.set("session", session);

    await next();
  });
};
