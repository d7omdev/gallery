import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";

const mockURLs = [
  "https://utfs.io/f/2004e289-b54a-43df-a38e-c61902b571c0-x3t66g.jpg",
  "https://utfs.io/f/f1cb7dca-6fd9-4b9a-ad2c-54205749d200-lgwsbe.jpg",
  "https://utfs.io/f/b5a6f74e-c8e0-4dce-b4ab-4b44bbc74d0a-qj04u4.jpg",
  "https://utfs.io/f/23b8ae75-0975-45ea-8666-bd95a149a65a-mngeo1.jpg",
];

const mockImages = mockURLs.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <main className="">
      <div className="flex flex-wrap gap-2">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <Link key={image.id + "-" + index} href={`/image/${image.id}`}>
            <img
              src={image.url}
              alt="image"
              className="h-48 w-full rounded-md object-cover"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
