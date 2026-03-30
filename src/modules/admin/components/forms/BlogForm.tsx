"use client";

import { uploadFileToS3 } from "@/src/library/awsUploader";
import { useCreateBlog } from "@/src/modules/blogs/hooks/mutations/use-create-blog";
import { useUpdateBlog } from "@/src/modules/blogs/hooks/mutations/use-edit-blog";
import { ImageIcon, Upload, X } from "lucide-react";
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-xl flex-col gap-5 rounded-2xl bg-(--neutral-semi-white) p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {mode === "edit" ? "Edit Blog" : "Create Blog"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-black/5"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium">
            Title
          </label>

          <input
            id="title"
            type="text"
            placeholder="Enter title"
            className="rounded-xl border px-4 py-3 outline-none transition focus:border-black"
            {...register("title", {
              required: "Title is required",
              validate: (value) =>
                value.trim().length > 0 || "Title is required",
            })}
          />

          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="font-medium">
            Content
          </label>

          <textarea
            id="content"
            rows={6}
            placeholder="Enter content"
            className="resize-none rounded-xl border px-4 py-3 outline-none transition focus:border-black"
            {...register("content", {
              required: "Content is required",
              validate: (value) =>
                value.trim().length > 0 || "Content is required",
            })}
          />

          {errors.content && (
            <p className="text-sm text-red-500">{errors.content.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Thumbnail</label>

          <input
            id="thumbnail"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
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

          <label
            htmlFor="thumbnail"
            className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-gray-400 bg-white px-4 py-4 transition hover:border-black hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-100 p-2">
                <Upload size={18} />
              </div>

              <div className="flex flex-col">
                <span className="font-medium">Choose thumbnail</span>
                <span className="text-sm text-gray-500">
                  PNG, JPG, WEBP — one file only
                </span>
              </div>
            </div>

            <span className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white">
              Browse
            </span>
          </label>

          {mode === "edit" && currentBlog?.thumbnail && !selectedFile && (
            <div className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3">
              <div className="rounded-full bg-gray-100 p-2">
                <ImageIcon size={18} />
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Current thumbnail</span>
                <span className="max-w-[320px] truncate text-sm font-medium">
                  {currentBlog.thumbnail.split("/").pop() ?? "Existing image"}
                </span>
              </div>
            </div>
          )}

          {selectedFile && (
            <div className="flex items-center justify-between rounded-xl border bg-white px-4 py-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="rounded-full bg-gray-100 p-2">
                  <ImageIcon size={18} />
                </div>

                <div className="flex min-w-0 flex-col">
                  <span className="text-sm text-gray-500">Selected file</span>
                  <span className="truncate text-sm font-medium">
                    {selectedFile.name}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={clearSelectedFile}
                className="ml-4 rounded-lg p-2 transition hover:bg-gray-100"
                aria-label="Remove selected file"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {errors.thumbnail && (
            <p className="text-sm text-red-500">{errors.thumbnail.message}</p>
          )}
        </div>

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
    </div>
  );
}