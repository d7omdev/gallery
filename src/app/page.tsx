import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-2">
        {[...images, ...images, ...images].map((image, index) => (
          <Link key={image.id + "-" + index} href={`/image/${image.id}`}>
            <img
              src={image.url}
              alt="image"
              className="h-48 w-full rounded-md object-cover"
            />
            <div>{image.name}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
