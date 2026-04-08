"use client";

import { useComments } from "@/src/modules/comments/hooks/queries/use-comments";
import { redirect, useParams } from "next/navigation";

export default function ReviewsHeader() {
  const params = useParams();
  const id = params.id as string;

  if (!id) redirect("/");
  const commentsQuery = useComments(id);
  const reviews = commentsQuery.data

  if(!reviews) return null

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return (
    <div className="flex items-center gap-2 mb-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            className={`text-lg ${s <= Math.round(avgRating) ? "text-(--primary)" : "text-gray-300"}`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-sm text-gray-500">{reviews.length} Reviews</span>
    </div>
  );
}
