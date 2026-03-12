import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  href: string;
  text: string;
};

export function CustomLink({ href, text }: Props) {
  return (
    <Link
      href={`/shop?categoryId=${href}`}
      className="inline-flex items-center gap-1 border-b border-(--primary) leading-7 text-(--primary)"
    >
      {text}
      <ArrowRight className="size-5" />
    </Link>
  );
}
