import { del, list, put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json(
      { error: "Filename is required" },
      { status: 400 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const userId = formData.get("userId") as File;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const { blobs } = await list({ prefix: `avatars/user-${userId}/` });

    if (blobs.length > 0) {
      await del(blobs[0]!.url);
    }

    const blob = await put(`avatars/user-${userId}/${filename}`, file, {
      access: "public",
    });

    return NextResponse.json(blob);
  } catch (err) {
    return NextResponse.json(
      { error: `"Upload failed": ${err}` },
      { status: 500 },
    );
  }
}
