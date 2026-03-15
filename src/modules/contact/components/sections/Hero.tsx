import { Breadcrumbs } from "@/src/components/common/Breadcrumbs";

export function Hero() {
  return (
    <div className="flex flex-col gap-6 max-w-280 px-8 w1120:px-0 w-full mx-auto">
      <Breadcrumbs />
      <h2 className="text-[28px] sm:text-[54px] leading-8.5 sm:leading-14.5 font-medium text-(--primary) max-w-208.5 tracking-[-1px]">
        We believe in sustainable decor. We&apos;re passionate about life at
        home.
      </h2>
      <p className="leading-6.5 text-(--primary) max-w-208.5">
        Our features timeless furniture, with natural fabrics, curved lines,
        plenty of mirrors and classic design, which can be incorporated into any
        decor project. The pieces enchant for their sobriety, to last for
        generations, faithful to the shapes of each period, with a touch of the
        present
      </p>
    </div>
  );
}
