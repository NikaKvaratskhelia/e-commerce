import { useForm } from "react-hook-form";
import { useState } from "react";
import { CommentDTO } from "../../server/DTOs/commet.dto";

type ReplyFormValues = {
  reply: string;
};

export function Comment({
  content,
  author,
  likes,
  replies,
}: Partial<CommentDTO>) {
  const [showReply, setShowReply] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ReplyFormValues>({
    defaultValues: { reply: "" },
  });

  const onSubmit = (data: ReplyFormValues) => {
    // TODO: api call unda gavaketo romlis route ar mak jer
    reset();
    setShowReply(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full border-b border-(--neutral-dark-white) py-4 mb-5">
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-[20px] leading-8 text-(--primary)">
          {author?.username}
        </h3>
        <p className="leading-6.5 text-(--neutral-light-grey)">{content}</p>
        <div className="flex gap-4 mt-2 pl-10 text-xs leading-5 font-semibold text-(--neutral-light-grey)">
          <p>{likes?.length} Like</p>
          <p
            className="cursor-pointer hover:text-(--primary) transition-colors"
            onClick={() => setShowReply((prev) => !prev)}
          >
            {showReply ? "Cancel" : "Reply"}
          </p>
        </div>

        {showReply && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pl-10 flex gap-2 mt-1"
          >
            <input
              autoFocus
              placeholder={`Reply to ${author?.username}...`}
              className="flex-1 border border-(--neutral-dark-white) rounded-md px-3 py-2 text-sm outline-none focus:border-(--primary) transition-colors"
              {...register("reply", { required: true, minLength: 1 })}
            />
            <button
              type="submit"
              disabled={!isValid}
              className="px-4 py-2 text-sm font-semibold bg-(--primary) text-white rounded-md disabled:opacity-40 transition-opacity"
            >
              Send
            </button>
          </form>
        )}
      </div>

      {replies && (
        <div className="pl-10">
          {replies.map((r) => (
            <div
              className="flex flex-col gap-4 border-t border-t-(--neutral-dark-white) py-5"
              key={r.id}
            >
              <h3 className="font-semibold text-[20px] leading-8 text-(--primary)">
                {r.author.username}
              </h3>
              <p className="leading-6.5 text-(--neutral-light-grey)">
                {r.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
