import { AlbumType } from "~/types";

import Link from "next/link";
import { getAlbums, getImage } from "~/server/queries";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import CreateAlbumButton from "~/components/create-album-button";

function Header() {
  return (
    <div className="flex items-center justify-between p-8">
      <span className="text-4xl font-bold">Albums</span>
      <CreateAlbumButton />
    </div>
  );
}

async function Album({ album }: { album: AlbumType }) {
  const coverImageId = album.imageIds?.[0];
  let coverImage;
  if (coverImageId) {
    coverImage = await getImage(coverImageId as string);
  }

  return (
    <div className=" overflow-hidden rounded-lg border shadow-white drop-shadow-md">
      <div className="flex  flex-col bg-zinc-800/50">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          {!coverImage ? (
            <div className="flex h-full w-full items-center justify-center bg-background text-center">
              No Images yet in this album
            </div>
          ) : (
            <img
              alt=""
              src={coverImage.url}
              style={{ objectFit: "cover" }}
              className={"duration-700 ease-in-out hover:opacity-75"}
            />
          )}
        </div>
        <div>
          <div className="flex items-center justify-between px-2 ">
            <span className="text-lg">{album.name} </span>
            <span className="text-sm text-gray-500">
              {album.imageIds?.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Albums() {
  const albums = await getAlbums();

  return (
    <>
      <SignedOut>
        <div className="h-full w-full bg-background text-center text-2xl">
          Please sign in to view the albums
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex w-full flex-col">
          <Header />
          <div className=" max-w-2xl px-1 py-6 sm:px-6 lg:max-w-full lg:px-8">
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 xl:gap-y-8">
              {albums.map((album) => (
                <Link key={album.id} href={`/albums/${album.id}`}>
                  <Album album={album} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
