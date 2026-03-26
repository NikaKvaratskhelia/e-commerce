"use client";

import { redirect, useParams } from "next/navigation";
import { useProductDetails } from "../../../hooks/queries/use-product-details";
import Image from "next/image";
import { useColorStore } from "../../store/useColorStore";

export function ProductColors() {
  const params = useParams();
  const id = params.id as string;

  if (!id) redirect("/");

  const query = useProductDetails(id);
  const { data } = query;

  const { selectedColorIndex, setSelectedColor } = useColorStore();
  const index = selectedColorIndex ? selectedColorIndex : 0;
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold leading-6.5 text-(--neutral-light-grey)">
        Choose Color:
      </p>

      <p className="text-[20px] leading-8">{data?.data?.colors[index].color}</p>

      <div className="flex gap-4 items-center">
        {data?.data?.colors.map((c, indx) => (
          <Image
            key={c.id}
            src={c.photos[0].url}
            alt={"Product color thumbnail"}
            width={72}
            height={72}
            className={`object-cover h-18 w-18 cursor-pointer ${index === indx ? "border-(--primary) border-2" : ""}`}
            onClick={() => {
              setSelectedColor(indx);
            }}
          />
        ))}
      </div>
    </div>
  );
}
