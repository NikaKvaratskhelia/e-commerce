import { CategoryFetched } from "@/src/modules/categories/server/routes";
import { Pencil } from "lucide-react";
import Image from "next/image";

export function CategoryCard({
  category,
  onEdit,
}: {
  category: CategoryFetched;
  onEdit: (category: CategoryFetched) => void;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all hover:border-black/20 hover:shadow-md">
      <Image
        src={category.categoryPhoto}
        alt={category.title}
        className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        width={200}
        height={160}
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="line-clamp-1 text-lg font-bold text-(--neutral-black)">
              {category.title}
            </h3>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs font-medium text-(--neutral-light-grey)">
                {category._count.products} Products
              </p>

              <button
                type="button"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-(--neutral-semi-white) text-(--neutral-black) transition-all hover:bg-black hover:text-white active:scale-90"
                onClick={() => onEdit(category)}
                title="Edit Category"
              >
                <Pencil size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
