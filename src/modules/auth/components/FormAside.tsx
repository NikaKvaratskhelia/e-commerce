import Image from "next/image";

export function FormAside() {
  return (
    <div className="relative max-h-screen h-fit bg-(--neutral-semi-white) flex items-center justify-center">
      <Image
        src="/logo.png"
        alt="Company logo"
        width={105}
        height={24}
        className="absolute left-1/2 -translate-x-1/2 top-13 z-1"
      />

      <div className="relative w-full h-screen">
        <Image
          src="/sofa.png"
          alt="Sofa placeholder photo"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
