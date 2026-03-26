export function DiscountExpiresSkeleton() {
  return (
    <div className="flex flex-col items-start gap-3 py-6 border-t border-(--neutral-dark-white)">
      <div className="h-4 w-32 rounded-md bg-(--neutral-light-grey)/20 animate-pulse" />

      <div className="flex items-start gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-15 h-15 rounded-sm bg-(--neutral-light-grey)/20 animate-pulse" />
            <div className="h-3 w-8 rounded-md bg-(--neutral-light-grey)/20 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
