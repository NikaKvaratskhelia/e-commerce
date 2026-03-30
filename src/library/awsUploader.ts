type UploadUrlResponse = {
  url: string;
  key: string;
  fileUrl: string;
};

async function getPresignedUrl(file: File): Promise<UploadUrlResponse> {
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: file.name,
      fileType: file.type,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to generate upload URL");
  }

  return data;
}

export async function uploadFileToS3(file: File) {
  const { url, fileUrl } = await getPresignedUrl(file);

  const uploadRes = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Failed to upload file to S3");
  }

  return fileUrl;
}
