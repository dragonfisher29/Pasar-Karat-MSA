import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getStorageBucketName, getSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";

const maxUploadBytes = 10 * 1024 * 1024;
const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function sanitizeFilename(filename: string) {
  const lastSegment = filename.split(/[/\\]/).pop() ?? "image";
  const withoutTraversal = lastSegment.replace(/\.\./g, "");
  const normalized = withoutTraversal
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "");
  return (normalized || "image").toLowerCase();
}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ error: "Supabase server configuration is missing." }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file upload." }, { status: 400 });
  }

  if (!allowedMimeTypes.has(file.type)) {
    return NextResponse.json({ error: "Unsupported image type." }, { status: 400 });
  }

  if (file.size <= 0 || file.size > maxUploadBytes) {
    return NextResponse.json({ error: "File is too large." }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json({ error: "Supabase is unavailable." }, { status: 503 });
  }

  const safeName = sanitizeFilename(file.name);
  const objectPath = `listings/${user.id}/${crypto.randomUUID()}-${safeName}`;
  const bucketName = getStorageBucketName();

  const { error: uploadError } = await supabase.storage.from(bucketName).upload(objectPath, file, {
    cacheControl: "3600",
    contentType: file.type,
    upsert: false,
  });

  if (uploadError) {
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(objectPath);
  return NextResponse.json({ publicUrl: data.publicUrl, path: objectPath }, { status: 200 });
}
