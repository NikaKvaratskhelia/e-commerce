"use client";

import { FormFilePicker } from "@/src/components/ui/FormFilePicker";
import { FormInput } from "@/src/components/ui/FormInput";
import { FormModal } from "@/src/components/ui/FormModal";
import { uploadFileToS3 } from "@/src/library/awsUploader";
import { useCreateCategory } from "@/src/modules/categories/hooks/mutations/use-create-category";
import { useUpdateCategory } from "@/src/modules/categories/hooks/mutations/use-edit-category";
import { CategoryFetched } from "@/src/modules/categories/server/routes";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type BlogFormMode = "create" | "edit";

type CategoryFormValues = {
  title: string;
  categoryPhoto: FileList;
};

type CategoryPayload = {
  title: string;
  categoryPhoto: string;
};

type CategoryFormProps = {
  mode: BlogFormMode;
  currentCategory?: CategoryFetched;
  onClose: () => void;
};

export function CategoryForm({
  mode,
  currentCategory,
  onClose,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    resetField,
  } = useForm<CategoryFormValues>({
    defaultValues: {
      title: currentCategory?.title ?? "",
    },
  });

  const categoryPhotoFiles = watch("categoryPhoto");
  const selectedFile = categoryPhotoFiles?.[0];

  const { mutate: addMutation, isPending: isCreating } = useCreateCategory();
  const { mutate: editMutation, isPending: isEditing } = useUpdateCategory();

  const isLoading = isSubmitting || isCreating || isEditing;

  const submitHandler = async (values: CategoryFormValues) => {
    try {
      let thumbnailUrl = currentCategory?.categoryPhoto ?? "";

      if (values.categoryPhoto && values.categoryPhoto.length > 0) {
        thumbnailUrl = await uploadFileToS3(values.categoryPhoto[0]);
      }

      if (!thumbnailUrl) {
        toast.error("Thumbnail upload failed. Please try again.");
        return;
      }

      const payload: CategoryPayload = {
        title: values.title.trim(),
        categoryPhoto: thumbnailUrl,
      };

      if (mode === "create") {
        addMutation(payload, {
          onSuccess: () => {
            onClose();
          },
        });
        return;
      }

      if (mode === "edit" && currentCategory) {
        editMutation(
          {
            id: currentCategory.id,
            payload,
          },
          {
            onSuccess: () => {
              onClose();
            },
          },
        );
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  const clearSelectedFile = () => {
    resetField("categoryPhoto");
  };

  return (
    <FormModal
      isOpen={true}
      onClose={onClose}
      title={mode === "edit" ? "Edit Blog" : "Create Blog"}
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-5"
      >
        <FormInput
          label="Title"
          placeholder="Enter title"
          error={errors.title?.message}
          {...register("title", {
            required: "Title is required",
            validate: (v) => v.trim().length > 0 || "Title is required",
          })}
        />

        <FormFilePicker
          label="Thumbnail"
          accept="image/jpeg,image/png,image/webp"
          error={errors.categoryPhoto?.message}
          selectedFile={selectedFile}
          existingFileUrl={currentCategory?.categoryPhoto}
          onClear={clearSelectedFile}
          {...register("categoryPhoto", {
            validate: (files) => {
              if (mode === "create" && (!files || files.length === 0)) {
                return "Thumbnail is required";
              }
              if (files && files.length > 1) {
                return "Only one image is allowed";
              }
              const file = files?.[0];
              if (
                file &&
                !["image/jpeg", "image/png", "image/webp"].includes(file.type)
              ) {
                return "Only JPG, PNG, and WEBP are allowed";
              }
              return true;
            },
          })}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 rounded-xl bg-black px-6 py-3.5 font-bold text-white shadow-lg transition-all hover:bg-black/80 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
              ? "Update Blog"
              : "Create Blog"}
        </button>
      </form>
    </FormModal>
  );
}
