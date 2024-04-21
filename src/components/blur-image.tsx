"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { type ImageType } from "./image-grid";

const BlurImage = (image: ImageType) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link href={`/img/${image.id}`} className="group col-span-2 w-72">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          alt=""
          src={image.url}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: "cover",
          }}
          className={cn(
            "duration-700 ease-in-out group-hover:opacity-75",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0",
          )}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
    </Link>
  );
};

export default BlurImage;
