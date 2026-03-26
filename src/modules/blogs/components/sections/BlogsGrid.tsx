import { useState } from "react";
import { useBlogs } from "../../hooks/queries/use-blogs";
import { BlogCard } from "../common/BlogCard";
import { Button } from "@/src/components/ui/Button";
import { CustomLoader } from "@/src/components/ui/Loader";

export function BlogsGrid() {
  const [limit, setLimit] = useState(9);

  const data = useBlogs(limit);
  const hasMore = (data?.data?.pagination?.total ?? 0) >= limit;

  if (data.isFetching) return <CustomLoader />;

  return (
    <div className="max-w-280 w-full mx-auto flex flex-col gap-20 pb-20 items-center">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(216px,1fr))] gap-6 w-full justify-items-center">
        {data?.data?.blogs.map((b) => (
          <BlogCard key={b.id} blog={b} variant={"withDate"} />
        ))}
      </div>
      {hasMore && (
        <div onClick={() => setLimit(limit + 9)}>
          <Button
            text={"Load More"}
            mode={"outline"}
            rounded={"rounded"}
            disabled={data.isFetching}
          />
        </div>
      )}
    </div>
  );
}
