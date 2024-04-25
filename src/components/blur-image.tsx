"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { type ImageType } from "~/types";

const BlurImage = (image: ImageType) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
      <Image
        alt=""
        src={image.url}
        fill
        style={{ objectFit: "cover" }}
        className={cn(
          "duration-700 ease-in-out group-hover:opacity-75",
          isLoading ? "scale-110 blur-2xl " : "scale-100 blur-0 ",
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

const DialogBlurImage = (image: ImageType) => {
  const [dialogIsLoading, setDialogIsLoading] = useState(true);

  return (
    <Image
      src={image.url}
      loading="eager"
      fill
      style={{ objectFit: "contain" }}
      alt={image.name}
      className={cn(
        " object-contain duration-700 ease-in-out group-hover:opacity-75",
        dialogIsLoading ? "scale-110 blur-2xl " : "scale-100 blur-0  ",
      )}
      onLoad={() => setDialogIsLoading(false)}
    />
  );
};

export { BlurImage, DialogBlurImage };
