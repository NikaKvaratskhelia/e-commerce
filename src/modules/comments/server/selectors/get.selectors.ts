import { Prisma } from "@/generated/prisma/browser";

export const get_comments_selector = {
  id: true,

  userId: true,
  author: {
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      password: true,
      role: true,
      emailVerified: true,
    },
  },

  prodcutId: true,

  content: true,

  createdAt: true,
  updatedAt: true,

  replies: {
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  },
  likes: {
    select: {
      id: true,
      userId: true,
      commentId: true,
    },
  },
} satisfies Prisma.CommentSelect;

export type ProductComments = Prisma.CommentGetPayload<{
  select: typeof get_comments_selector;
}>;
