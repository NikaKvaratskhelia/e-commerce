"use client";

import { redirect, useParams } from "next/navigation";
import { useComments } from "../../hooks/queries/use-comments";
import { CommentsForm } from "../common/CommentsForm";
import { Comment } from "../common/Comment";

export function CommentsSection() {
  const id = useParams().id as string;
  if (!id) redirect("/");

  const query = useComments(id);

  return (
    <div className="flex flex-col gap-5">
      <CommentsForm />
      <div className="fle flex-col gap-2 w-full">
        {query.data?.map((c) => (
          <Comment
            key={c.id}
            content={c.content}
            author={c.author}
            replies={c.replies}
            likes={c.likes}
          />
        ))}
      </div>
    </div>
  );
}
