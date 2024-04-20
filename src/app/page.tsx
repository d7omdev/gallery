import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  return (
    <div className="m-8 grid place-items-center gap-4 md:grid-cols-2 xl:grid-cols-5">
      {images.map((image, index) => (
        <Link href={`/img/${image.id}`} scroll={false}>
          <div
            key={image.id + "-" + index}
            className="flex transform cursor-pointer items-center overflow-hidden rounded-lg border border-gray-700 shadow-lg shadow-slate-900 transition-all duration-300 ease-in-out hover:scale-105 hover:border-gray-500 hover:shadow-slate-800"
          >
            <div className="overflow-hidden rounded shadow-lg shadow-slate-900">
              <Image
                className="h-48 w-96 object-cover"
                src={image.url}
                alt={`Image of ${image.name}`}
                width={300}
                priority
                height={200}
              />
              <div className=" max-w-60 px-1 py-2 ">
                <div className="flex  items-baseline overflow-hidden text-ellipsis">
                  <div className="truncate">{image.name}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Pleas sign in to view the gallery
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
