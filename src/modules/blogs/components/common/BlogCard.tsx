import CustomLink from "@/src/components/ui/CustomLink";
import Image from "next/image";
import { BlogDTO } from "../../server/models";
import Link from "next/link";

type Props = {
  blog: BlogDTO;
  variant: "withDate" | "default";
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default function BlogCard({ blog, variant }: Props) {
  return (
    <div className="flex flex-col gap-6 min-w-0 max-w-89.25 w-full">
      <Link
        href={`/blog/${blog.id}`}
        className="relative block h-70.75 w-full sm:h-81.25"
      >
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </Link>

      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-[20px] font-medium leading-7">{blog.title}</h2>

        {variant === "default" ? (
          <CustomLink href={`/blog/${blog.id}`} text="Read More" />
        ) : (
          <p className="text-xs leading-5 text-(--neutral-light-grey)">
            {formatDate(blog.createdAt)}
          </p>
        )}
      </div>
    </div>
  );
}
