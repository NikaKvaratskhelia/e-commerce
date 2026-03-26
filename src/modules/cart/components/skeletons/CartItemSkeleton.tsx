export function CartItemSkeleton() {
  return (
    <div
      className="flex w-full max-w-120 items-center gap-4 rounded-xl border border-gray-200 p-4"
      aria-hidden="true"
    >
      <div className="h-16 w-16 shrink-0 animate-pulse rounded-lg bg-gray-200" />

      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />

        <div className="mt-1 flex gap-2">
          <div className="h-7 w-7 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-6 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-7 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <div className="flex shrink-0 self-stretch py-1 flex-col items-end justify-between">
        <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  );
}
