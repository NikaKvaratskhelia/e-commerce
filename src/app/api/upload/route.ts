import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

interface UploadRequest {
  fileName: string;
  fileType: string;
}

const s3Client = new S3Client({
  region: process.env.AWS_REGIO,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_I!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KE!,
  },
});

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "model/gltf+json",
  "model/gltf-binary",
  "application/octet-stream",
]);

const allowedExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".pdf",
  ".gltf",
  ".glb",
]);

function getExtension(fileName: string) {
  const lastDot = fileName.lastIndexOf(".");
  if (lastDot === -1) return "";
  return fileName.slice(lastDot).toLowerCase();
}

function resolveContentType(fileName: string, fileType: string) {
  const ext = getExtension(fileName);

  if (ext === ".glb") return "model/gltf-binary";
  if (ext === ".gltf") return "model/gltf+json";
  if (ext === ".pdf") return "application/pdf";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";

  return fileType || "application/octet-stream";
}

export async function POST(request: Request) {
  try {
    const { fileName, fileType }: UploadRequest = await request.json();

    if (!fileName || fileName.length > 100) {
      return NextResponse.json(
        { message: "Invalid file name" },
        { status: 400 }
      );
    }

    const extension = getExtension(fileName);

    if (!allowedExtensions.has(extension)) {
      return NextResponse.json(
        { message: "File extension not allowed" },
        { status: 400 }
      );
    }

    if (fileType && !allowedMimeTypes.has(fileType)) {
      return NextResponse.json(
        {
          message: "File type not allowed",
          receivedType: fileType,
        },
        { status: 400 }
      );
    }

    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `uploads/${Date.now()}-${sanitizedFileName}`;
    const contentType = resolveContentType(fileName, fileType);

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60,
    });

    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({
      url: signedUrl,
      key,
      fileUrl,
      contentType,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}