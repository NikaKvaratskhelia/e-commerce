import { ProductComments } from "../../server/selectors";

export type CommentDTO = Omit<ProductComments, "createdAt" | "replies"> & {
  createdAt: string;
  replies: (Omit<ProductComments["replies"][number], "createdAt"> & {
    createdAt: string;
  })[];
};
