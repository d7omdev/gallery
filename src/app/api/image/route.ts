import { updateImageName } from "~/server/queries";

export async function PATCH(request: Request) {
  try {
    const { imageId, newName } = await request.json();
    const image = await updateImageName(imageId, newName);
    let body = JSON.stringify(image);
    return new Response(body, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response("An error occurred", { status: 500 });
  }
}

export async function GET(request: Request) {
  return new Response("Not implemented", { status: 501 });
}
