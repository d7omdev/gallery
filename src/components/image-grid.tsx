import { deleteImage, favoriteImage } from "~/server/queries";
import { BlurImage, DialogBlurImage } from "./blur-image";
import FavoriteButton from "./favorite-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import * as timeago from "timeago.js";
import { Fullscreen, Share } from "lucide-react";
import DeleteButton from "./delete-button";
import { ShareButton } from "./share-button";

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
  favorited?: number[];
}) {
  return (
    <div className=" max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 xl:gap-y-8">
        {images.map((image) => (
          <Image key={image.id} {...image} favorited={favorited || []} />
        ))}
      </div>
    </div>
  );
}

function Image({ ...image }: ImageType & { favorited: number[] }) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const createdAt = new Date(image.createdAt).toISOString();
  const timeStamp = timeago.format(createdAt, userTimezone);
  return (
    <Dialog>
      <div className="relative overflow-hidden rounded-lg">
        <form
          className="absolute top-0 z-10  flex w-full items-center justify-between bg-zinc-800/50"
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
          <DialogTrigger className="p-1">
            <Fullscreen />
          </DialogTrigger>
        </form>
        <BlurImage {...image} />
      </div>
      <DialogContent className="h-max object-fill">
        <DialogHeader>
          <DialogTitle className="pt-4">{image.name}</DialogTitle>
          <DialogDescription>{`Created ${timeStamp}`}</DialogDescription>
        </DialogHeader>
        <div className="   flex  flex-col gap-4 overflow-hidden rounded-lg">
          <DialogBlurImage {...image} />
        </div>
        <div className=" z-20 flex justify-between">
          <DialogClose>
            <form
              action={async () => {
                "use server";
                await deleteImage(image.id);
              }}
            >
              <DeleteButton />
            </form>
          </DialogClose>
          <ShareButton {...image} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
