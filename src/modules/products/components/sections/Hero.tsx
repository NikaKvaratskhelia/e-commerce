import Image from "next/image";

export function Hero() {
  return (
    <div className="relative py-28.75 w-full max-w-280 flex items-center justify-center mx-auto">
      <Image
        src="/BlogsPlaceholder.png"
        alt="Blogs hero"
        fill
        className="object-cover"
        priority
      />

      <div className="flex flex-col items-center justify-center gap-6 relative z-10">
        <p className="text-(--neutral-light-grey)">
          Home {">"} <span className="text-(--primary)">Shop</span>
        </p>
        <h2 className="text-[40px] leading-11 sm:text-[54px] sm:leading-14.5 font-medium">
          Shop Page
        </h2>
        <p className=" leading-6.5 sm:text-xl sm:leading-8">
          Let&apos;s design the place you always imagined.
        </p>
      </div>
    </div>
  );
}
