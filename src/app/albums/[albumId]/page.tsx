import { SignedIn, SignedOut } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteButton from "~/components/delete-button";
import Image from "~/components/image";
import RemoveImageFromAlbum from "~/components/removeImageFromAlbum-button";
import { Dialog } from "~/components/ui/dialog";
import UpdateAlbumName from "~/components/updateAlbumName-button";
import { deleteAlbum, getAlbum, getAlbumImages } from "~/server/queries";

export const dynamic = "force-dynamic";

function Header({
  albumName,
  albumId,
}: {
  albumName: string;
  albumId: string;
}) {
  return (
    <div className="flex flex-col items-center justify-between p-6 md:flex-row">
      <div className="flex gap-4 text-2xl font-bold md:text-4xl">
        <Link
          href={"/albums"}
          className="ml-2 transition-colors ease-in-out hover:text-white/50"
        >
          Albums
        </Link>
        <span>/</span>
        <span className="break-words">{albumName}</span>
      </div>
      <Dialog>
        <form
          className="flex  gap-2 p-2 "
          id="albumDeleteForm"
          action={async () => {
            "use server";
            await deleteAlbum(albumId);
            redirect("/albums");
          }}
        >
          <UpdateAlbumName albumId={albumId} currentName={albumName} />
          <DeleteButton itemName="album" formId="albumDeleteForm" />
        </form>
      </Dialog>
    </div>
  );
}

export default async function Album({
  params: { albumId: albumId },
}: {
  params: { albumId: string };
}) {
  const album = await getAlbum(albumId);

  const images = await getAlbumImages(album.imageIds);

  return (
    <>
      <SignedOut>
        <div className="h-full w-full bg-background text-center text-2xl">
          Please sign in to view the album
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex w-full flex-col">
          <Header albumName={album.name} albumId={album.id} />

          {!images ? (
            <div className="flex h-full w-full items-center justify-center p-4 text-center text-4xl">
              No images yet in this album
            </div>
          ) : (
            <div className=" max-w-2xl px-1 py-6 sm:px-6 lg:max-w-full lg:px-8">
              <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 xl:gap-y-8">
                {images.map((image) => (
                  <Image
                    key={image.id}
                    {...image}
                    actions={
                      <RemoveImageFromAlbum
                        imageId={image.id}
                        albumId={album.id}
                      />
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </SignedIn>
    </>
  );
}
