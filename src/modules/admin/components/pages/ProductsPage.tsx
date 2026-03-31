"use client";

import { useState } from "react";
import { AddItemBtn } from "../common/AddItemBtn";
import { ProductsTable } from "../common/ProductsTable";
import { ProductForm } from "../forms/ProductForm";
import { ProductDetailModel } from "@/src/modules/products/server/selectors/get.selector";

export default function ProductsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedProduct, setSelectedProduct] = useState<
    ProductDetailModel | undefined
  >();

  const handleAdd = () => {
    setFormMode("create");
    setSelectedProduct(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (product: ProductDetailModel) => {
    setFormMode("edit");
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-[24px]  font-medium">Products</h2>
        <AddItemBtn text="Product" onClick={handleAdd} />
      </div>

      <ProductsTable />
      {isFormOpen && (
        <ProductForm
          mode={formMode}
          currentProduct={selectedProduct}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
