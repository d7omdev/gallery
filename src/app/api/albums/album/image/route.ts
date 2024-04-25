import { addImageToAlbum, deleteImageFromAlbum } from "~/server/queries";

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

export async function DELETE(request: Request) {
  try {
    const { imageId, albumId } = await request.json();
    const album = await deleteImageFromAlbum(imageId, albumId);
    let body = JSON.stringify(album);
    return new Response(body, { status: 200 });
  } catch (error) {
    let errorMessage = "An error occurred while deleting the image from the album.";
    console.error(error);
    return new Response(errorMessage, { status: 500 });
  }
}
