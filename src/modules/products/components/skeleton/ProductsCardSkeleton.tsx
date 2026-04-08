export function ProductCardSkeleton({
  layout = "column",
}: {
  layout?: "row" | "column";
}) {
  return (
    <div
      className={`flex gap-4 ${layout === "column" ? "flex-col w-65.5" : "flex-row w-full"}`}
    >
      <div className="relative h-87.5 min-w-65.5 bg-(--neutral-semi-white) animate-pulse" />

      <div
        className={`flex-col gap-1 mt-4 ${layout === "column" ? "flex" : "hidden"}`}
      >
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse mt-1" />
      </div>

      <div
        className={`${layout === "column" ? "hidden" : "flex"} flex-col gap-6 px-6 w-full`}
      >
        <div className="flex flex-col gap-2">
          <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-col gap-2 mb-auto">
          <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-4/6 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-10 w-36 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-36 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
