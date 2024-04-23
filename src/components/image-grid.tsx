import Image from "./image";
import { ImageType } from "./image";

export default function Gallery({
  images,
  favorited,
}: {
  images: ImageType[];
  favorited?: string[];
}) {
  return (
    <div className=" max-w-2xl px-4 py-1 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 xl:gap-y-8">
        {images.map((image) => (
          <Image key={image.id} {...image} favorited={favorited || []} />
        ))}
      </div>
    </div>
  );
}
