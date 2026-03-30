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

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
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

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `uploads/${Date.now()}-${sanitizedFileName}`,
      ContentType: fileType,
    };

    const command = new PutObjectCommand(params);
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error: (error as Error).message },
      { status: 500 },
    );
  }
}
