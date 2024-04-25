import { addImageToAlbum, removeImageFromAlbum } from "~/server/queries";

export async function POST(request: Request) {
  try {
    const { imageId, albumId } = await request.json();
    const album = await addImageToAlbum(imageId, albumId);
    let body = JSON.stringify(album);
    return new Response(body, { status: 200 });
  } catch (error) {
    let errorMessage = "An error occurred while adding the image to the album.";
    console.error(error);
    return new Response(errorMessage, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { imageId, albumId } = await request.json();
    const album = await removeImageFromAlbum(imageId, albumId);
    let body = JSON.stringify(album);
    return new Response(body, { status: 200 });
  } catch (error) {
    let errorMessage =
      "An error occurred while removing the image from the album.";
    console.error(error);
    return new Response(errorMessage, { status: 500 });
  }
}
