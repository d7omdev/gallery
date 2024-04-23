import Gallery from "~/components/image-grid";
import { getFavoriteImages } from "~/server/queries";

export async function FavoriteImages() {
  const images = await getFavoriteImages();
  const favorited = images.map((image) => image.id);
  if (images.length === 0) {
    return (
      <div className="mx-auto p-4 py-20 text-center text-2xl font-semibold">
        Favorite some images to see them here!
      </div>
    );
  }
  return <Gallery images={images} favorited={favorited} />;
}
