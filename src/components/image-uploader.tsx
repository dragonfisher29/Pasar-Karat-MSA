"use client";

import Image from "next/image";
import { useMemo, useState, type ChangeEvent } from "react";
import { getStorageBucketName, getSupabaseBrowserClient, hasSupabaseEnv } from "@/lib/supabase";

type ImageUploaderProps = {
  onChange: (urls: string[]) => void;
};

export function ImageUploader({ onChange }: ImageUploaderProps) {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const bucketName = useMemo(() => getStorageBucketName(), []);

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    if (!hasSupabaseEnv()) {
      setError("Add Supabase environment variables before uploading images from device.");
      return;
    }

    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setError("Supabase is not available for uploads.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const nextUrls: string[] = [];

      for (const file of files) {
        const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
        const path = `listings/${Date.now()}-${safeName}`;

        const { error: uploadError } = await supabase.storage.from(bucketName).upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
        nextUrls.push(data.publicUrl);
      }

      const mergedUrls = [...uploadedUrls, ...nextUrls];
      setUploadedUrls(mergedUrls);
      onChange(mergedUrls);
    } catch {
      setError("Image upload failed. Check your bucket policies and try again.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-4">
      <div className="soft-card rounded-[1rem] border-dashed p-4">
        <label className="mb-3 block text-sm font-semibold text-slate-700" htmlFor="galleryUpload">
          Upload images from device
        </label>
        <input
          accept="image/*"
          className="field cursor-pointer"
          id="galleryUpload"
          multiple
          onChange={handleUpload}
          type="file"
        />
        <p className="mt-3 text-sm text-slate-500">
          {uploading ? "Uploading images..." : "Upload up to several listing photos into Supabase Storage."}
        </p>
        {error ? <p className="mt-2 text-sm font-medium text-rose-600">{error}</p> : null}
      </div>

      {uploadedUrls.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {uploadedUrls.map((url) => (
            <div key={url} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <Image
                alt="Uploaded listing preview"
                className="aspect-[4/3] w-full object-cover"
                height={240}
                src={url}
                unoptimized
                width={320}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
