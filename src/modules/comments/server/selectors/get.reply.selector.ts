import { Prisma } from "@/generated/prisma/browser";

export const get_replies_selector = {
  id: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  author: {
    select: {
      id: true,
      name: true,
      username: true,
    },
  },
} satisfies Prisma.ReplySelect;

export type RawCommentReply = Prisma.ReplyGetPayload<{
  select: typeof get_replies_selector;
}>;

export type CommentReplyDto = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string | null;
    username: string | null;
  };
};
