export function ProductDetailHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-4 justify-center max-w-127 py-6">
      <div className="h-5 w-28 rounded-md bg-(--neutral-light-grey)/20 animate-pulse" />

      <div className="flex flex-col gap-2">
        <div className="h-10 w-50 rounded-md bg-(--neutral-light-grey)/20 animate-pulse" />
        <div className="h-10 w-50 rounded-md bg-(--neutral-light-grey)/20 animate-pulse" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-5 w-40 rounded-md bg-(--neutral-light-grey)/20 animate-pulse" />
        <div className="h-5 w-40 rounded-md bg-(--neutral-light-grey)/20 animate-pulse" />
        <div className="h-5 w-30 rounded-md bg-(--neutral-light-grey)/20 animate-pulse" />
      </div>

      <div className="flex items-baseline gap-3">
        <div className="h-8 w-24 rounded-md bg-(--neutral-light-grey)/20 animate-pulse" />
        <div className="h-6 w-16 rounded-md bg-(--neutral-light-grey)/20 animate-pulse" />
      </div>
    </div>
  );
}
