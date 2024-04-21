import Gallery from "~/components/image-grid";
import { getMyImages } from "~/server/queries";

export async function Images() {
  const images = await getMyImages();
  return <Gallery images={images} />;
}
