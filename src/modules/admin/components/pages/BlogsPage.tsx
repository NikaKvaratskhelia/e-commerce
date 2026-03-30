'use client'

import { AddItemBtn } from "../common/AddItemBtn";
import { BlogForm } from "../forms/BlogForm";
import { BlogsLayout } from "../sections/BlogsLayout";

export function BlogsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="mb-4 text-2xl font-bold">Blogs</h1>
          <p className="mb-6 text-sm font-semibold text-(--neutral-light-grey)">
            Manage your blog posts here.
          </p>
        </div>

        <div className="mb-6">
          <AddItemBtn text="Blog" form={(onClose) => <BlogForm mode="create" onClose={onClose} />} />
        </div>
      </div>

      <BlogsLayout />
    </div>
  );
}
