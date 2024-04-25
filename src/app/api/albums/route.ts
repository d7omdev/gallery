import { getAlbums } from "~/server/queries";

export async function GET() {
  try {
    const albums = await getAlbums();
    let body;
    if (albums.length < 1) body = [];
    body = JSON.stringify(albums);
    return new Response(body, { status: 200 });
  } catch (error) {
    console.error("Error retrieving albums:", error);
    return new Response("Error retrieving albums", { status: 500 });
  }
}
