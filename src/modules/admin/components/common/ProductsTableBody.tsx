"use client";

import Image from "next/image";
import { useAdminProducts } from "../../hooks/queries/use-admin-products";

export function ProductsTableBody() {
  const { data } = useAdminProducts();

  return (
    <tbody>
      {data?.data?.map((product) => (
        <tr key={product.id} className="border-b border-(--neutral-light-grey)">
          <td className="py-5 px-4">
            <div className="flex gap-2 items-center">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={64}
                height={64}
                className="rounded-xl w-16 h-16"
              />
              <p className="font-bold">{product.title}</p>
            </div>
          </td>

          <td className="py-5 px-4">{product.productCategory.title}</td>

          <td className="py-5 px-4">${product.price.toFixed(2)}</td>

          <td className="py-5 px-4">{product.stock}</td>
          <td className="py-5 px-4">{product._count.colors}</td>

          <td className="py-5 px-4">
            {product.discounts[0]?.discountPercentage || 0}%
          </td>
        </tr>
      ))}
    </tbody>
  );
}
