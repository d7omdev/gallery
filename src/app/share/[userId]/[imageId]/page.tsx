import * as timeago from "timeago.js";
import { clerkClient } from "@clerk/nextjs/server";
import { getImageByUserID } from "~/server/queries";

export default async function SharedImage({
  params: { imageId: imageId, userId: userId },
}: {
  params: { imageId: string; userId: string };
}) {
  if (!userId || !imageId) {
    return (
      <div className="mx-auto py-20 text-2xl font-semibold">
        The page you are looking for does not exist
      </div>
    );
  }

  if (
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      imageId,
    )
  ) {
    return (
      <div className="mx-auto py-20 text-2xl font-semibold">
        The page you are looking for does not exist
      </div>
    );
  }

  const image = await getImageByUserID(userId, imageId);

  if (!image) {
    return (
      <div className="mx-auto py-20 text-2xl font-semibold">
        The page you are looking for does not exist
      </div>
    );
  }

  const uploaderInfo = await clerkClient.users.getUser(userId);
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const createdAt = new Date(image.createdAt).toISOString();
  const timeStamp = timeago.format(createdAt, userTimezone);

  return (
    <section className="flex h-full flex-col justify-center md:flex-row lg:flex-row">
      <img
        alt={image.name}
        src={image.url}
        className="h-auto object-contain md:w-2/3 lg:w-2/3 "
      />

      <div className="w-full gap-2 border-gray-700 bg-background/90 p-4 text-center md:h-auto  md:w-1/3 md:border-l lg:border-l">
        <h2 className="mt-6 break-words border-b border-gray-700 py-3 text-xl uppercase sm:text-2xl lg:text-4xl">
          {image.name}
        </h2>
        <div className="flex flex-row justify-between pt-4">
          <p className="mt-2 block text-lg text-white/50">
            By:
            <span className="p-2"> {uploaderInfo.fullName}</span>
          </p>
          <p className="mt-2 block text-lg text-white/50">
            <span className="p-2"> {timeStamp}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
