import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import "server-only";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return images;
}

export async function getImage(id: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image Not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));
  revalidatePath("/");
  redirect("/");
}

export async function favoriteImage(id: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image Not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  await db
    .update(images)
    .set({ favorite: !image.favorite })
    .where(eq(images.id, id));
  revalidatePath("/favorites");
  revalidatePath("/");
}

export async function getFavoriteImages() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { and, eq }) =>
      and(eq(model.userId, user.userId), eq(model.favorite, true)),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return images;
}

export async function getImageByUserID(userId: string, imageId: string) {
  const image = await db.query.images.findFirst({
    where: (model, { and, eq }) =>
      and(eq(model.userId, userId), eq(model.id, imageId)),
  });

  if (!image) return null;

  return image;
}
