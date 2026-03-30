"use client";

import { useState } from "react";
import { AddItemBtn } from "../common/AddItemBtn";
import { CategoryFetched } from "@/src/modules/categories/server/routes/get.routes";
import { CategoriesLayout } from "../sections/CategoriesLayout";
import { CategoryForm } from "../forms/CategoryForm";

export default function CategoriesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFetched | undefined>();

  const handleAdd = () => {
    setFormMode("create");
    setSelectedCategory(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (category: CategoryFetched) => {
    setFormMode("edit");
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="mb-4 text-2xl font-bold">Categories</h1>
          <p className="text-sm font-semibold text-(--neutral-light-grey)">
            Manage your categories here.
          </p>
        </div>

        <AddItemBtn text="Category" onClick={handleAdd} />
      </div>

      <CategoriesLayout onEdit={handleEdit} />

      {isFormOpen && (
        <CategoryForm
          mode={formMode}
          currentCategory={selectedCategory}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
