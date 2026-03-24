"use client";

import { BlogsGrid } from "./components/sections/BlogsGrid";
import { Hero } from "./components/sections/Hero";

export default function BlogsPage() {
  return (
    <div className="flex flex-col gap-16 px-8 w1120:px-0">
      <Hero />
      <BlogsGrid />
    </div>
  );
}
