"use client";

import { redirect, useParams } from "next/navigation";
import { useAddComment } from "../../hooks/mutations/use-add-comment";
import { Button } from "@/src/components/ui/Button";
import { useForm, Controller } from "react-hook-form";
import { StarRating } from "./StarRating";

type ReviewFormValues = {
  content: string;
  rating: number;
};

export function CommentsForm() {
  const id = useParams().id as string;
  if (!id) redirect("/");

  const { mutate } = useAddComment(id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    defaultValues: {
      content: "",
      rating: 0,
    },
  });

  const onSubmit = (data: ReviewFormValues) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-(--neutral-dark-white) rounded-2xl flex flex-col gap-4 p-4"
      >
        <Controller
          name="rating"
          control={control}
          rules={{ min: { value: 1, message: "Please select a rating" } }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <StarRating value={field.value} onChange={field.onChange} />
              {errors.rating && (
                <span className="text-red-500 text-xs">
                  {errors.rating.message}
                </span>
              )}
            </div>
          )}
        />

        <div className="flex gap-3 items-center justify-between">
          <div className="flex flex-col flex-1 gap-1 w-full">
            <input
              type="text"
              placeholder="Write your review..."
              {...register("content", {
                required: "Comment is required",
                minLength: { value: 3, message: "Too short" },
              })}
              className="w-full bg-transparent outline-none placeholder:text-gray-400 py-4 px-2"
            />
            {errors.content && (
              <span className="text-red-500 text-xs">
                {errors.content.message}
              </span>
            )}
          </div>
          <div className="max-w-75 ">
            <Button
              text={"Write Review"}
              mode={"solid"}
              rounded={"rounded"}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
