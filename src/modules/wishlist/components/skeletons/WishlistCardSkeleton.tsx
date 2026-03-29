export function WishlistCardSkeleton() {
  return (
    <tr className="max-w-176.75 grid grid-cols-1 sm:grid-cols-3 w-full justify-items-start border-b border-(--neutral-light-grey) py-2">
      <td className="flex items-center gap-4 relative">
        <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse shrink-0" />

        <div className="w-15 h-18 rounded bg-gray-200 animate-pulse shrink-0" />

        <div className="flex flex-col gap-2">
          <div className="w-28 h-4 rounded bg-gray-200 animate-pulse" />
          <div className="w-20 h-3 rounded bg-gray-200 animate-pulse" />
        </div>
      </td>

      <td className="flex items-center justify-center">
        <div className="w-12 h-4 rounded bg-gray-200 animate-pulse" />
      </td>

      <td className="flex items-center">
        <div className="w-28 h-9 rounded bg-gray-200 animate-pulse" />
      </td>
    </tr>
  );
}
