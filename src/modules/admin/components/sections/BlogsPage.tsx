import { AddItemBtn } from "../common/AddItemBtn";
import { BlogsLayout } from "./BlogsLayout";

export function BlogsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Blogs</h1>
          <p className="text-(--neutral-light-grey) mb-6 font-semibold text-sm">
            Manage your blog posts here.
          </p>
        </div>

        <div className="mb-6">
          <AddItemBtn text={"Blog"} />
        </div>
      </div>
      <BlogsLayout />
    </div>
  );
}
