import { Pencil } from "lucide-react";
import Image from "next/image";

export type BlogItem = {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: string;
  content: string;
};

export function BlogCard({
  blog,
  onEdit,
}: {
  blog: BlogItem;
  onEdit: (blog: BlogItem) => void;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all hover:border-black/20 hover:shadow-md">
      <Image
        src={blog.thumbnail}
        alt={blog.title}
        className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        width={200}
        height={160}
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="line-clamp-1 text-lg font-bold text-(--neutral-black)">
              {blog.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-(--neutral-light-grey)">
              {blog.content}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs font-medium text-(--neutral-light-grey)">
                {new Date(blog.createdAt)?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <button
                type="button"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-(--neutral-semi-white) text-(--neutral-black) transition-all hover:bg-black hover:text-white active:scale-90"
                onClick={() => onEdit(blog)}
                title="Edit blog"
              >
                <Pencil size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
