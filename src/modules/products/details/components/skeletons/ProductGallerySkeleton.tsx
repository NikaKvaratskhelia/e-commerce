export function ProductGallerySkeleton() {
  return (
    <div className="max-w-136.75 w-full flex flex-col gap-6">
      <div className="relative bg-(--neutral-semi-white) w-137 h-182.25 animate-pulse">
        <div className="flex flex-col gap-2 absolute top-8 left-8 z-20">
          <div className="w-16 h-7 rounded-sm bg-(--neutral-light-grey)/20" />
        </div>

        <div className="absolute z-10 left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-(--neutral-light-grey)/20" />

        <div className="absolute z-10 right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-(--neutral-light-grey)/20" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-41.75 rounded-sm bg-(--neutral-light-grey)/20 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
