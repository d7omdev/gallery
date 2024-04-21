import Gallery from "~/components/image-grid";
import { getFavoriteImages } from "~/server/queries";

export async function FavoriteImages() {
  const images = await getFavoriteImages();
  if (images.length === 0) {
    return (
      <div className="mx-auto py-20 text-2xl font-semibold">
        Favorite some images to see them here!
      </div>
    );
  }
  return <Gallery images={images} />;
}
