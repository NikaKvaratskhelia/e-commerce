"use client";

import { redirect, useParams } from "next/navigation";
import { useProductDetails } from "../../../hooks/queries/use-product-details";
import { useState } from "react";
import { ThreeJsScene } from "../common/ThreeJsScene";
import { ProductGallery } from "../common/ProductGallery";
import { useColorStore } from "../../store/useColorStore";

export function ViewProduct() {
  const params = useParams();
  const id = params.id as string;

  if (!id) redirect("/");

  const query = useProductDetails(id);
  const { data } = query;

  const [viewMode, setViewMode] = useState<"gallery" | "3d">("gallery");

  const { selectedColorIndex } = useColorStore();
  const index = selectedColorIndex ? selectedColorIndex : 0;

  return (
    <div className="flex flex-col gap-6 flex-1">
      {data?.data?.colors[index]?.has3D ? (
        <div className="flex gap-2 items-center">
          <h2
            className={`${viewMode === "gallery" ? "text-(--primary) font-semibold" : "text-(--neutral-light-grey)"} text-[20px] cursor-pointer transition-colors duration-500`}
            onClick={() => setViewMode("gallery")}
          >
            Product Gallery
          </h2>
          <span className="text-[30px]">|</span>
          <h2
            className={`${viewMode === "3d" ? "text-(--primary) font-semibold" : "text-(--neutral-light-grey)"} text-[20px] cursor-pointer transition-colors duration-500`}
            onClick={() => setViewMode("3d")}
          >
            3D Model
          </h2>
        </div>
      ) : (
        <h2 className="text-(--primary) text-[20px] font-semibold">
          Product Gallery
        </h2>
      )}

      {viewMode === "3d" ? <ThreeJsScene /> : <ProductGallery />}
    </div>
  );
}
