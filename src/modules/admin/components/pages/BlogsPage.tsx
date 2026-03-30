"use client";

import { useState } from "react";
import { BlogItem } from "../common/BlogCard";
import { AddItemBtn } from "../common/AddItemBtn";
import { BlogForm } from "../forms/BlogForm";
import { BlogsLayout } from "../sections/BlogsLayout";

export function BlogsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | undefined>();

  const handleAdd = () => {
    setFormMode("create");
    setSelectedBlog(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (blog: BlogItem) => {
    setFormMode("edit");
    setSelectedBlog(blog);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="mb-4 text-2xl font-bold">Blogs</h1>
          <p className="text-sm font-semibold text-(--neutral-light-grey)">
            Manage your blog posts here.
          </p>
        </div>

        <AddItemBtn text="Blog" onClick={handleAdd} />
      </div>

      <BlogsLayout onEdit={handleEdit} />

      {isFormOpen && (
        <BlogForm
          mode={formMode}
          currentBlog={selectedBlog}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
