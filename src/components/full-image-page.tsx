import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "~/components/ui/button";

export default async function FullPageImage(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  const createdAt = new Date(image.createdAt)
    .toLocaleDateString()
    .split("T")[0];
  return (
    <section className="flex h-full flex-col justify-center md:flex-row lg:flex-row">
      <img
        alt={image.name}
        src={image.url}
        loading="lazy"
        className="h-auto object-contain md:w-2/3 lg:w-2/3"
      />

      <div className="bg-background/90 w-full gap-2 border-l border-gray-700 p-4 text-center md:h-auto md:w-1/3">
        <h2 className="mt-6 break-words border-b border-gray-700 py-3 text-xl uppercase sm:text-2xl lg:text-6xl">
          {image.name}
        </h2>
        <div className="flex flex-row justify-between pt-4">
          <p className="mt-2 block text-lg text-white/50">
            Uploaded By:
            <span className="p-2"> {uploaderInfo.fullName}</span>
          </p>
          <p className="mt-2 block text-lg text-white/50">
            Created On:
            <span className="p-2"> {createdAt}</span>
          </p>
        </div>
        <div className=" pt-10">
          <form
            action={async () => {
              "use server";
              await deleteImage(image.id);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
