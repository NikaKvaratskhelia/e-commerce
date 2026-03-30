"use client";

import { useBlogs } from "@/src/modules/blogs/hooks/queries/use-blogs";
import { BlogCard } from "../common/BlogCard";

export function BlogsLayout() {
  const { data } = useBlogs();

  return (
    <div className="grid grid-cols-3 gap-6">
      {data?.blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
