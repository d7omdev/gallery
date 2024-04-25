import {
  createAlbum,
  deleteAlbum,
  getAlbum,
  updateAlbumName,
} from "~/server/queries";

export async function GET(request: Request) {
  try {
    const albumName = await request.json();
    const album = await getAlbum(albumName);
    let body = JSON.stringify(album);
    return new Response(body, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response("An error occurred", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const album = await createAlbum(name);
    let body = JSON.stringify(album);
    return new Response(body, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response("An error occurred", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { albumId, newName } = await request.json();
    const album = await updateAlbumName(albumId, newName);
    let body = JSON.stringify(album);
    return new Response(body, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response("An error occurred", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { name } = await request.json();
    const album = await deleteAlbum(name);
    let body = JSON.stringify(album);
    return new Response(body, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response("An error occurred", { status: 500 });
  }
}
