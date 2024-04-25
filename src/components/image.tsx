import { deleteImage, favoriteImage } from "~/server/queries";
import { BlurImage, DialogBlurImage } from "./blur-image";
import FavoriteButton from "./favorite-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import * as timeago from "timeago.js";
import { Fullscreen } from "lucide-react";
import DeleteButton from "./delete-button";
import { ShareButton } from "./share-button";
import { ImageType } from "~/types";
import AddToButton from "./addto-button";

export default function Image({
  actions,
  ...image
}: ImageType & { favorited?: string[]; actions?: React.ReactNode }) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const createdAt = new Date(image.createdAt).toISOString();
  const timeStamp = timeago.format(createdAt, userTimezone);
  return (
    <>
      <Dialog>
        <div className="group overflow-hidden rounded-lg border shadow-white drop-shadow-md">
          <BlurImage {...image} />
          <div className="flex  flex-col bg-zinc-800/50">
            <form
              className=" flex w-full items-center justify-between"
              action={async () => {
                "use server";
                await favoriteImage(image.id);
              }}
            >
              <FavoriteButton
                id={image.id}
                favorite={!!image.favorite}
                favorites={image.favorited ?? []}
              />
              <div className="flex gap-2 p-1">
                {actions}
                <DialogTrigger>
                  <Fullscreen />
                </DialogTrigger>
              </div>
            </form>
          </div>
        </div>
        <DialogContent className="h-max object-fill">
          <DialogHeader>
            <DialogTitle className="pt-4">{image.name}</DialogTitle>
            <DialogDescription>{`Created ${timeStamp}`}</DialogDescription>
          </DialogHeader>
          <div className="   aspect-h-1  aspect-w-1 flex flex-col gap-4 overflow-hidden rounded-lg ">
            <DialogBlurImage {...image} />
          </div>
          <div className=" flex justify-between">
            <form
              id="imageDeleteForm"
              action={async () => {
                "use server";
                await deleteImage(image.id, image.url);
              }}
            >
              <DeleteButton itemName="image" formId="imageDeleteForm" />
            </form>
            <div className=" flex gap-2">
              <AddToButton imageId={image.id} />
              <ShareButton {...image} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
