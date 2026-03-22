"use client";

import { useParams } from "next/navigation";
import { useComments } from "../../hooks/queries/use-comments";
import { CommentsForm } from "../common/CommentsForm";
import { Comment } from "../common/Comment";

export function CommentsSection() {
  const params = useParams();
  const id = params.id as string;

  const query = useComments(id);

  return (
    <div className="flex flex-col gap-5">
      <CommentsForm />

      <div className="flex w-full flex-col gap-2">
        {query.data?.map((c) => (
          <Comment
            key={c.id}
            id={c.id}
            content={c.content}
            author={c.author}
            likesCount={c.likesCount}
            isLikedByMe={c.isLikedByMe}
          />
        ))}
      </div>
    </div>
  );
}
