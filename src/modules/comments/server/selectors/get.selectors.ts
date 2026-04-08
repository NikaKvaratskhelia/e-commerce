import { Prisma } from "@/generated/prisma/browser";

export const get_comments_selector = {
  id: true,
  content: true,
  rating: true,
  createdAt: true,
  updatedAt: true,

  author: {
    select: {
      id: true,
      name: true,
      username: true,
    },
  },

  _count: {
    select: {
      likes: true,
      replies: true,
    },
  },

  likes: {
    select: {
      userId: true,
    },
  },
} satisfies Prisma.CommentSelect;

export type RawProductComment = Prisma.CommentGetPayload<{
  select: typeof get_comments_selector;
}>;

export type ProductCommentDto = {
  id: number;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string | null;
    username: string | null;
  };
  likesCount: number;
  repliesCount: number;
  isLikedByMe: boolean;
};