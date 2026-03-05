import Link from "next/link";

type FormHeaderProps = {
  header: string;
  text: string;
  linkText: string;
  href: string;
};

export default function FormHeader({
  header,
  text,
  linkText,
  href,
}: FormHeaderProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-[40px] leading-11 text-(-neutral-black) font-medium">
        {header}
      </h1>
      <p className="text-(--neutral-dark-grey) leading-6.5">
        {text}{" "}
        <Link href={href} className="text-(--green) font-semibold leading-6.5">
          {linkText}
        </Link>
      </p>
    </div>
  );
}
