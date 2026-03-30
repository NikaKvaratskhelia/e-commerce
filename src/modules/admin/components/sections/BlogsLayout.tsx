"use client";

import { useBlogs } from "@/src/modules/blogs/hooks/queries/use-blogs";
import { BlogCard, BlogItem } from "../common/BlogCard";

export function BlogsLayout({
  onEdit,
}: {
  onEdit: (blog: BlogItem) => void;
}) {
  const { data } = useBlogs();

  return (
    <div className="grid grid-cols-3 gap-6">
      {data?.blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} onEdit={onEdit} />
      ))}
    </div>
  );
}
