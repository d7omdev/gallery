import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  return (
    <div className=" my-4 flex flex-wrap justify-center gap-4 px-6 py-4">
      {images.map((image, index) => (
        <div key={image.id + "-" + index}>
          <Link href={`/img/${image.id}`}>
            <Image
              className=" rounded-md border border-gray-500"
              src={image.url}
              alt={image.name}
              style={{ objectFit: "contain" }}
              width={300}
              height={192}
            />
          </Link>
        </div>
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
