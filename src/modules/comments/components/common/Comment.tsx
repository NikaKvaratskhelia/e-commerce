"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAddReply } from "../../hooks/mutations/use-add-reply";
import { useLikeComment } from "../../hooks/mutations/use-like-comment";
import { useReplies } from "../../hooks/queries/use-replies";
import { useParams } from "next/navigation";

type ReplyFormValues = {
  reply: string;
};

type CommentProps = {
  id: number;
  content: string;
  author: {
    id: string;
    name: string | null;
    username: string | null;
  };
  likesCount: number;
  isLikedByMe: boolean;
};

export function Comment({
  id,
  content,
  author,
  likesCount,
  isLikedByMe,
}: CommentProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const { mutate: addReply, isPending: isReplyPending } = useAddReply();
  const { mutate: likeComment, isPending: isLikePending } = useLikeComment();

  const params = useParams();
  const productId = params.id;

  const repliesQuery = useReplies(id, showReplies);
  console.log(repliesQuery);
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ReplyFormValues>({
    defaultValues: { reply: "" },
    mode: "onChange",
  });

  if (typeof productId !== "string") return null;

  const onSubmit = (data: ReplyFormValues) => {
    addReply(
      { commentId: id, content: data.reply },
      {
        onSuccess: () => {
          reset();
          setShowReplyForm(false);
        },
      },
    );
  };

  return (
    <div className="mb-5 flex w-full flex-col gap-5 border-b border-(--neutral-dark-white) py-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-[20px] leading-8 font-semibold text-(--primary)">
          {author.username ?? author.name ?? "Unknown user"}
        </h3>

        <p className="leading-6.5 text-(--neutral-light-grey)">{content}</p>

        <div className="mt-2 flex gap-4 pl-10 text-xs leading-5 font-semibold text-(--neutral-light-grey)">
          <button
            type="button"
            disabled={isLikePending}
            className={`cursor-pointer transition-colors ${
              isLikedByMe ? "text-(--primary)" : "hover:text-(--primary)"
            } disabled:opacity-50`}
            onClick={() => likeComment({ commentId: id, productId })}
          >
            {likesCount} {likesCount === 1 ? "Like" : "Likes"}
          </button>

          <button
            type="button"
            className="cursor-pointer transition-colors hover:text-(--primary)"
            onClick={() => setShowReplyForm((prev) => !prev)}
          >
            {showReplyForm ? "Cancel" : "Reply"}
          </button>

          <button
            type="button"
            className="cursor-pointer transition-colors hover:text-(--primary)"
            onClick={() => setShowReplies((prev) => !prev)}
          >
            {showReplies
              ? "Hide replies"
              : `${repliesQuery?.data?.length ?? 0} ${repliesQuery?.data?.length === 1 ? "Reply" : "Replies"}`}
          </button>
        </div>

        {showReplyForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-1 flex gap-2 pl-10"
          >
            <input
              autoFocus
              placeholder={`Reply to ${author.username ?? author.name ?? "user"}...`}
              className="flex-1 rounded-md border border-(--neutral-dark-white) px-3 py-2 text-sm outline-none transition-colors focus:border-(--primary)"
              {...register("reply", {
                required: true,
                minLength: 1,
              })}
            />

            <button
              type="submit"
              disabled={!isValid || isReplyPending}
              className="rounded-md bg-(--primary) px-4 py-2 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
            >
              Send
            </button>
          </form>
        )}

        {showReplies && (
          <div className="mt-2 flex flex-col gap-4 pl-10">
            {repliesQuery.isLoading && <p>Loading replies...</p>}

            {repliesQuery.data?.map((reply) => (
              <div
                key={reply.id}
                className="flex flex-col gap-2 border-l-2 border-(--neutral-dark-white) pl-4"
              >
                <h4 className="font-semibold text-(--primary)">
                  {reply.author.username ?? reply.author.name ?? "Unknown user"}
                </h4>
                <p className="text-(--neutral-light-grey)">{reply.content}</p>
              </div>
            ))}

            {!repliesQuery.isLoading &&
              repliesQuery.data &&
              repliesQuery.data.length === 0 && <p>No replies yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
