import Gallery from "~/components/image-grid";
import { getMyImages } from "~/server/queries";

export async function Images() {
  const images = await getMyImages();

  if (images.length === 0) {
    return (
      <div className="mx-auto py-20 text-2xl font-semibold">
        You have not uploaded any images yet.
      </div>
    );
  }

  return <Gallery images={images} />;
}
