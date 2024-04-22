import { favoriteImage } from "~/server/queries";
import BlurImage from "./blur-image";
import FavoriteButton from "./favorite-button";

export type ImageType = {
  id: number;
  name: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
  favorite: boolean | null;
};

export default function Gallery({
  images,
  favorited,
}: {
  images: ImageType[];
  favorited: number[];
}) {
  return (
    <div className=" max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 xl:gap-y-8">
        {images.map((image) => (
          <Image key={image.id} {...image} favorited={favorited} />
        ))}
      </div>
    </div>
  );
}

function Image({ ...image }: ImageType & { favorited: number[] }) {
  return (
    <div className="relative ">
      <form
        className="absolute top-0 z-10  "
        action={async () => {
          "use server";
          await favoriteImage(image.id);
        }}
      >
        <FavoriteButton
          id={image.id}
          favorite={!!image.favorite}
          favorites={image.favorited}
        />
      </form>
      <BlurImage {...image} />
    </div>
  );
}
