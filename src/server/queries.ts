import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import "server-only";
import { images, albums } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

const UTDelete = async (idS: string | string[]) => {
  try {
    await utapi.deleteFiles(idS);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete image");
  }
};

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

  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: string, url: string) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  await db.query.albums.findMany().then(async (Albums) => {
    for (const album of Albums) {
      if (album.imageIds?.includes(id)) {
        await db
          .update(albums)
          .set({
            imageIds: album.imageIds?.filter((imageId) => imageId !== id),
          })
          .where(eq(albums.id, album.id));
      }
    }
  });

  const UTid = url.split("/")[4];
  await UTDelete(UTid!);
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

export async function getAlbumImages(imagesIds: string[] | null) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  if (imagesIds === null || imagesIds.length === 0) return;
  const images = await db.query.images.findMany({
    where: (model, { inArray: $inArray }) => $inArray(model.id, imagesIds),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return images;
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

export async function createAlbum(name: string) {
  const album = await db.query.albums.findFirst({
    where: (model, { eq }) => eq(model.name, name),
  });

  if (album) throw new Error("Album already exists");

  await db.insert(albums).values({ name });
  revalidatePath("/albums");
  return album;
}

export async function updateAlbumName(albumId: string, newName: string) {
  const album = await db.query.albums.findFirst({
    where: (model, { eq }) => eq(model.id, albumId),
  });

  if (!album) throw new Error("Album not found");

  await db.update(albums).set({ name: newName }).where(eq(albums.id, albumId));
  revalidatePath(`/albums/${albumId}`);
  return album;
}

export async function deleteAlbum(albumId: string) {
  try {
    await db.delete(albums).where(eq(albums.id, albumId));
    revalidatePath("/albums");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete album");
  }
  revalidatePath("/albums");
  return "Album deleted successfully";
}

export async function getAlbums() {
  const albums = await db.query.albums.findMany();

  if (!albums) throw new Error("No albums found");
  return albums;
}

export async function getAlbum(albumId: string) {
  const album = await db.query.albums.findFirst({
    where: (model, { eq }) => eq(model.id, albumId),
  });

  if (!album) throw new Error("Album not found");

  return album;
}

export async function addImageToAlbum(imageId: string, albumId: string) {
  const album = await db.query.albums.findFirst({
    where: (model, { eq }) => eq(model.id, albumId),
  });

  if (!album) throw new Error("Album not found");

  await db
    .update(albums)
    .set({ imageIds: [...(album.imageIds ?? []), imageId] })
    .where(eq(albums.id, albumId));
  revalidatePath(`/albums`);
  revalidatePath(`/albums/${albumId}`);
  return album;
}

export async function removeImageFromAlbum(imageId: string, albumId: string) {
  const album = await db.query.albums.findFirst({
    where: (model, { eq }) => eq(model.id, albumId),
  });

  if (!album) throw new Error("Album not found");

  await db
    .update(albums)
    .set({
      imageIds: (album.imageIds ?? []).filter((id) => id !== imageId),
    })
    .where(eq(albums.id, albumId));
  revalidatePath(`/albums`);
  return album;
}
