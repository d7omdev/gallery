import Image from "next/image";
import { getImage } from "~/server/queries";

// import { Modal } from "./modal";
export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = parseInt(photoId, 10);
  if (isNaN(idAsNumber)) throw new Error("Invalid ID");

  const image = await getImage(idAsNumber);
  return (
    <div>
      <img src={image.url} alt={image.name} className="w-96" />
    </div>
  );
}
