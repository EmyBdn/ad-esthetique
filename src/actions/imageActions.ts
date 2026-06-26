"use server";

import { put } from "@vercel/blob";
import { del } from "@vercel/blob";

export type ImageFolder = "categories" | "subcategories" | "services";

export async function deleteImage(url: string) {
  if (!url) return;

  await del(url);
}

export async function uploadImage(
  file: File,
  folder: ImageFolder,
): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error("Aucun fichier fourni");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Le fichier doit être une image");
  }

  const extension = file.name.split(".").pop();

  const filename = `${folder}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const blob = await put(filename, file, {
    access: "public",
  });

  return blob.url;
}
