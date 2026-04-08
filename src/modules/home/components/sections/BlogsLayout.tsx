"use client";

import { CustomLink } from "@/src/components/ui/CustomLink";
import { BlogCard } from "@/src/modules/blogs/components/common/BlogCard";
import { useBlogs } from "@/src/modules/blogs/hooks/queries/use-blogs";

export function BlogsLayout() {
  const { data, isLoading } = useBlogs();

  if (!data || isLoading || data.blogs.length == 0) return null;

  return (
    <div className="max-w-280 w-full flex flex-col gap-10 mx-auto py-10 sm:py-20 px-8 box-border">
      <div className="w-full flex items-center justify-between flex-wrap h-fit gap-3">
        <h2 className="text-[34px] sm:text-[40px] leading-9.5 sm:leading-11 font-medium">
          Articles
        </h2>
        <CustomLink href={"/blog"} text={"More Articles"} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
        {data?.blogs?.slice(0, 3).map((b) => (
          <BlogCard key={b.id} blog={b} variant="default" />
        ))}
      </div>
    </div>
  );
}
