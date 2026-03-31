"use client";

import { Checkbox } from "@/src/components/ui/Checkbox";
import { FormFilePicker } from "@/src/components/ui/FormFilePicker";
import { FormInput } from "@/src/components/ui/FormInput";
import { FormModal } from "@/src/components/ui/FormModal";
import { FormMultiFilePicker } from "@/src/components/ui/FormMultiFilePicker";
import { FormSelect } from "@/src/components/ui/FormSelect";
import { FormTextarea } from "@/src/components/ui/FormTextarea";
import { uploadFileToS3 } from "@/src/library/awsUploader";
import { useCategories } from "@/src/modules/categories/hooks/queries/use-categories";
import { useCreateProduct } from "@/src/modules/products/hooks/mutations/use-create-product";
import { useUpdateProduct } from "@/src/modules/products/hooks/mutations/use-edit-product";
import { ProductDetailModel } from "@/src/modules/products/server/selectors/get.selector";
import { Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

type ProductFormMode = "create" | "edit";

type ProductColorValues = {
  color: string;
  has3D: boolean;
  photos?: FileList;
  model3d?: FileList;
};

type ProductFormValues = {
  title: string;
  description: string;
  price: string;
  stock: string;
  productCategoryId: string;
  thumbnail?: FileList;
  colors: ProductColorValues[];
};

export type ProductFormData = {
  id: number;
  title: string;
  description: string;
  productCategoryId: number;
  price: number;
  stock: number;
  thumbnail: string;
  colors?: Array<{
    color: string;
    has3D: boolean;
  }>;
};

type ProductFormProps = {
  mode: ProductFormMode;
  currentProduct?: ProductDetailModel;
  onClose: () => void;
};

export function ProductForm({
  mode,
  currentProduct,
  onClose,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    resetField,
    setValue,
  } = useForm<ProductFormValues>({
    defaultValues: {
      title: currentProduct?.title ?? "",
      description: currentProduct?.description ?? "",
      price: currentProduct?.price?.toString() ?? "",
      stock: currentProduct?.stock?.toString() ?? "",
      productCategoryId: currentProduct?.productCategoryId?.toString() ?? "",
      thumbnail: undefined,
      colors: currentProduct?.colors?.length
        ? currentProduct.colors.map((c) => ({
            color: c.color,
            has3D: c.has3D,
            photos: undefined,
            model3d: undefined,
          }))
        : [
            {
              color: "",
              has3D: false,
              photos: undefined,
              model3d: undefined,
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "colors",
  });

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useCategories();

  const categoryOptions =
    categoriesData?.data?.map((cat: { id: number; title: string }) => ({
      value: String(cat.id),
      label: cat.title,
    })) ?? [];

  const thumbnailFiles = watch("thumbnail");
  const selectedThumbnail = thumbnailFiles?.[0];
  const colorsWatch = watch("colors");

  const { mutate: addMutation, isPending: isCreating } = useCreateProduct();
  const { mutate: editMutation, isPending: isEditing } = useUpdateProduct();

  const isLoading =
    isSubmitting || isCreating || isEditing || isLoadingCategories;

  const submitHandler = async (values: ProductFormValues) => {
    try {
      let thumbnailUrl = currentProduct?.thumbnail ?? "";

      if (values.thumbnail?.[0]) {
        thumbnailUrl = await uploadFileToS3(values.thumbnail[0]);
      }

      if (!thumbnailUrl) {
        toast.error("Thumbnail upload failed.");
        return;
      }

      const colorsPayload = await Promise.all(
        values.colors.map(async (colorVal, index) => {
          const photoFiles = Array.from(colorVal.photos ?? []);

          if (!photoFiles.length) {
            throw new Error(
              `Color #${index + 1} must have at least one photo.`,
            );
          }

          const photoUrls = await Promise.all(
            photoFiles.map((file) => uploadFileToS3(file)),
          );

          let model3dUrl = "";

          if (colorVal.has3D) {
            const modelFile = colorVal.model3d?.[0];

            if (!modelFile) {
              throw new Error(
                `Color #${index + 1} requires a 3D model when 3D view is enabled.`,
              );
            }

            model3dUrl = await uploadFileToS3(modelFile);
          }

          return {
            color: colorVal.color,
            has3D: colorVal.has3D,
            photos: photoUrls,
            model3d: model3dUrl,
          };
        }),
      );

      const payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        stock: Number(values.stock),
        thumbnail: thumbnailUrl,
        productCategoryId: Number(values.productCategoryId),
        colors: colorsPayload,
      };

      if (Number.isNaN(payload.price) || payload.price < 0) {
        toast.error("Price must be a valid number.");
        return;
      }

      if (!Number.isInteger(payload.stock) || payload.stock < 0) {
        toast.error("Stock must be a valid whole number.");
        return;
      }

      if (Number.isNaN(payload.productCategoryId)) {
        toast.error("Category is required.");
        return;
      }

      console.log(payload);

      if (mode === "create") {
        addMutation(payload as never, {
          onSuccess: () => onClose(),
        });
      } else {
        if (!currentProduct?.id) {
          toast.error("Product id is missing.");
          return;
        }

        editMutation(
          {
            id: currentProduct.id,
            payload: payload as never,
          },
          {
            onSuccess: () => onClose(),
          },
        );
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <FormModal
      isOpen={true}
      onClose={onClose}
      title={mode === "edit" ? "Edit Product" : "Create Product"}
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex max-h-[75vh] flex-col gap-6 overflow-y-auto"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormInput
            label="Title"
            placeholder="Product title"
            error={errors.title?.message}
            {...register("title", {
              required: "Title is required",
              validate: (value) =>
                value.trim().length > 0 || "Title is required",
            })}
          />

          <FormSelect
            label="Category"
            options={categoryOptions}
            error={errors.productCategoryId?.message}
            {...register("productCategoryId", {
              required: "Category is required",
            })}
          />

          <FormInput
            label="Price"
            type="number"
            step="0.01"
            placeholder="0.00"
            error={errors.price?.message}
            {...register("price", {
              required: "Price is required",
              validate: (value) => {
                const parsed = Number(value);
                if (Number.isNaN(parsed)) return "Price must be a number";
                if (parsed < 0) return "Price cannot be negative";
                return true;
              },
            })}
          />

          <FormInput
            label="Stock"
            type="number"
            placeholder="0"
            error={errors.stock?.message}
            {...register("stock", {
              required: "Stock is required",
              validate: (value) => {
                const parsed = Number(value);
                if (Number.isNaN(parsed)) return "Stock must be a number";
                if (!Number.isInteger(parsed))
                  return "Stock must be a whole number";
                if (parsed < 0) return "Stock cannot be negative";
                return true;
              },
            })}
          />
        </div>

        <FormTextarea
          label="Description"
          placeholder="Product description"
          rows={4}
          error={errors.description?.message}
          {...register("description", {
            required: "Description is required",
            validate: (value) =>
              value.trim().length > 0 || "Description is required",
          })}
        />

        <Controller
          control={control}
          name="thumbnail"
          rules={{
            validate: (files) => {
              if (mode === "create" && !files?.length) {
                return "Thumbnail is required";
              }
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <FormFilePicker
              label="Thumbnail"
              accept="image/*"
              error={fieldState.error?.message}
              selectedFile={selectedThumbnail}
              onClear={() => {
                setValue("thumbnail", undefined, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }}
              onChange={(e) => {
                field.onChange(e.target.files ?? undefined);
              }}
            />
          )}
        />

        <hr className="my-2" />

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Product Colors</h3>

          <button
            type="button"
            onClick={() =>
              append({
                color: "",
                has3D: false,
                photos: undefined,
                model3d: undefined,
              })
            }
            className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/80"
          >
            <Plus size={16} />
            Add Color
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative flex flex-col gap-5 rounded-2xl border bg-gray-50/50 p-5 pt-10"
            >
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute right-4 top-4 text-red-500 transition hover:text-red-700"
                  title="Remove color"
                >
                  <Trash2 size={20} />
                </button>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormInput
                  label={`Color #${index + 1} Name`}
                  placeholder="e.g. Red, Midnight Blue"
                  error={errors.colors?.[index]?.color?.message}
                  {...register(`colors.${index}.color`, {
                    required: "Color name is required",
                    validate: (value) =>
                      value.trim().length > 0 || "Color name is required",
                  })}
                />

                <Controller
                  control={control}
                  name={`colors.${index}.has3D`}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium sm:text-base">
                        Support 3D View
                      </label>

                      <Checkbox
                        label="Enable 3D Model"
                        checked={!!field.value}
                        onCheckedChange={(checked: boolean) =>
                          field.onChange(checked)
                        }
                      />
                    </div>
                  )}
                />
              </div>

              <Controller
                control={control}
                name={`colors.${index}.photos`}
                rules={{
                  validate: (files) => {
                    if (!files?.length) return "At least one photo is required";
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormMultiFilePicker
                    label="Color Photos (Multiple)"
                    accept="image/*"
                    error={fieldState.error?.message}
                    selectedFiles={Array.from(field.value ?? [])}
                    onRemove={(photoIdx) => {
                      const currentFiles = Array.from(field.value ?? []);
                      const dt = new DataTransfer();

                      currentFiles.forEach((file, i) => {
                        if (i !== photoIdx) dt.items.add(file);
                      });

                      field.onChange(dt.files.length ? dt.files : undefined);
                    }}
                    onChange={(e) => {
                      const pickedFiles = Array.from(e.target.files ?? []);
                      const currentFiles = Array.from(field.value ?? []);
                      const dt = new DataTransfer();

                      [...currentFiles, ...pickedFiles].forEach((file) => {
                        dt.items.add(file);
                      });

                      field.onChange(dt.files);

                      e.target.value = "";
                    }}
                  />
                )}
              />

              {colorsWatch?.[index]?.has3D && (
                <Controller
                  control={control}
                  name={`colors.${index}.model3d`}
                  rules={{
                    validate: (files) => {
                      if (colorsWatch?.[index]?.has3D && !files?.length) {
                        return "3D model is required when 3D view is enabled";
                      }
                      return true;
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <FormFilePicker
                      label="3D Model (GLB/GLTF)"
                      accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
                      error={fieldState.error?.message}
                      selectedFile={field.value?.[0]}
                      onClear={() => {
                        field.onChange(undefined);
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.files ?? undefined);
                      }}
                    />
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full rounded-xl bg-black py-4 font-bold text-white shadow-lg transition-all hover:bg-black/80 hover:shadow-xl active:scale-[0.99] disabled:opacity-50"
        >
          {isLoading
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
              ? "Update Product"
              : "Create Product"}
        </button>
      </form>
    </FormModal>
  );
}
