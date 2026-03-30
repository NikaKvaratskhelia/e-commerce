"use client";

import { FormFilePicker } from "@/src/components/ui/FormFilePicker";
import { FormInput } from "@/src/components/ui/FormInput";
import { FormModal } from "@/src/components/ui/FormModal";
import { FormTextarea } from "@/src/components/ui/FormTextarea";
import { uploadFileToS3 } from "@/src/library/awsUploader";
import { useCreateBlog } from "@/src/modules/blogs/hooks/mutations/use-create-blog";
import { useUpdateBlog } from "@/src/modules/blogs/hooks/mutations/use-edit-blog";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type BlogFormMode = "create" | "edit";

type CurrentBlog = {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
};

type BlogFormValues = {
  title: string;
  content: string;
  thumbnail: FileList;
};

type BlogPayload = {
  title: string;
  content: string;
  thumbnail: string;
};

type BlogFormProps = {
  mode: BlogFormMode;
  currentBlog?: CurrentBlog;
  onClose: () => void;
};

export function BlogForm({ mode, currentBlog, onClose }: BlogFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    resetField,
  } = useForm<BlogFormValues>({
    defaultValues: {
      title: currentBlog?.title ?? "",
      content: currentBlog?.content ?? "",
    },
  });

  const thumbnailFiles = watch("thumbnail");
  const selectedFile = thumbnailFiles?.[0];

  const { mutate: addMutation, isPending: isCreating } = useCreateBlog();
  const { mutate: editMutation, isPending: isEditing } = useUpdateBlog();

  const isLoading = isSubmitting || isCreating || isEditing;

  const submitHandler = async (values: BlogFormValues) => {
    try {
      let thumbnailUrl = currentBlog?.thumbnail ?? "";

      if (values.thumbnail && values.thumbnail.length > 0) {
        thumbnailUrl = await uploadFileToS3(values.thumbnail[0]);
      }

      if (!thumbnailUrl) {
        toast.error("Thumbnail upload failed. Please try again.");
        return;
      }

      const payload: BlogPayload = {
        title: values.title.trim(),
        content: values.content.trim(),
        thumbnail: thumbnailUrl,
      };

      if (mode === "create") {
        addMutation(payload, {
          onSuccess: () => {
            onClose();
          },
        });
        return;
      }

      if (mode === "edit" && currentBlog) {
        editMutation(
          {
            id: currentBlog.id,
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
    resetField("thumbnail");
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

        <FormTextarea
          label="Content"
          placeholder="Enter content"
          rows={6}
          error={errors.content?.message}
          {...register("content", {
            required: "Content is required",
            validate: (v) => v.trim().length > 0 || "Content is required",
          })}
        />

        <FormFilePicker
          label="Thumbnail"
          accept="image/jpeg,image/png,image/webp"
          error={errors.thumbnail?.message}
          selectedFile={selectedFile}
          existingFileUrl={currentBlog?.thumbnail}
          onClear={clearSelectedFile}
          {...register("thumbnail", {
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
          className="rounded-xl bg-black px-4 py-3 text-white transition disabled:opacity-50"
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