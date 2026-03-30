import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

interface UploadRequest {
  fileName: string;
  fileType: string;
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const { fileName, fileType }: UploadRequest = await request.json();

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",

      "model/gltf+json",
      "model/gltf-binary",
    ];

    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json(
        { message: "File type not allowed" },
        { status: 400 },
      );
    }

    if (!fileName || fileName.length > 100) {
      return NextResponse.json(
        { message: "Invalid file name" },
        { status: 400 },
      );
    }

    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `uploads/${Date.now()}-${sanitizedFileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60,
    });

    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({
      url: signedUrl,
      key,
      fileUrl,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
