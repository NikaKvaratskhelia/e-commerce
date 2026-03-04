import Image from "next/image";

export default function FormAside() {
  return (
    <div className="relative max-h-270 h-fit bg-(--neutral-semi-white) flex items-center justify-center">
      <Image
        src="/logo.png"
        alt="Company logo"
        width={105}
        height={24}
        className="absolute left-1/2 -translate-x-1/2 top-13"
      />

      <Image
        src="/sofa.png"
        alt="Sofa placeholder photo"
        width={736}
        height={1080}
      />
    </div>
  );
}
