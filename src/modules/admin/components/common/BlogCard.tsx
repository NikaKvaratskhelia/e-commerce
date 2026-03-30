"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { BlogForm } from "../forms/BlogForm";

export function BlogCard({
  blog,
}: {
  blog: {
    id: number;
    title: string;
    thumbnail: string;
    createdAt: string;
    content: string;
  };
}) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Image
        src={blog.thumbnail}
        alt={blog.title}
        className="h-40 w-full object-cover"
        width={200}
        height={160}
      />

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{blog.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {blog.content.length > 50
                ? `${blog.content.slice(0, 50)}...`
                : blog.content}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(blog.createdAt)?.toLocaleDateString()}
            </p>
          </div>
          <button
            className="cursor-pointer"
            onClick={() => setShowForm(!showForm)}
          >
            <Pencil />
          </button>
        </div>
      </div>

      {showForm && <BlogForm mode="edit" currentBlog={blog} onClose={()=>setShowForm(false)}/>}
    </div>
  );
}
