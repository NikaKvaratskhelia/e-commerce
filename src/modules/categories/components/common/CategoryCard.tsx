import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProductCategory } from "@/generated/prisma/browser";

type Props = {
  category: ProductCategory
  href: string;
  variant: "col" | "row";
};

export function CategoryCard({ category, href = "#", variant }: Props) {
  const isCol = variant === "col";

  return (
    <article
      className={`group relative isolate flex w-full overflow-hidden bg-(--neutral-semi-white) px-8 py-6 md:px-12 ${
        isCol
          ? "max-w-137 flex-1 flex-col justify-between min-h-94.25 sm:min-h-166"
          : "max-w-137 flex-1 items-end justify-between min-h-45.25 sm:min-h-80"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div
          className={`absolute ${
            isCol
              ? "inset-x-0 bottom-0 h-[78%] sm:h-[82%]"
              : "top-0 right-0 h-full w-[72%]"
          }`}
        >
          <Image
            src={category.categoryPhoto}
            alt=""
            fill
            sizes={
              isCol
                ? "(max-width: 640px) 100vw, 550px"
                : "(max-width: 640px) 70vw, 500px"
            }
            className={`object-contain ${
              isCol ? "object-bottom" : "object-bottom-right"
            }`}
          />
        </div>
      </div>

      <div
        className={`relative z-10 flex flex-col items-start gap-3 ${
          isCol ? "" : "self-center"
        }`}
      >
        <h2 className="text-[28px] leading-8.5 font-medium text-(--primary) md:text-[34px] md:leading-9.5">
          {category.title}
        </h2>

        <Link
          href={href}
          className="inline-flex items-center gap-1 border-b border-(--primary) leading-7 text-(--primary)"
          aria-label={`Shop ${category.title}`}
        >
          Shop Now
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </article>
  );
}
