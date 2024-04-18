import FullPageImage from "~/components/full-image-page";

export default function PhotoPage({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = parseInt(photoId);
  if (isNaN(idAsNumber)) throw new Error("Invalid ID");

  return <FullPageImage id={idAsNumber} />;
}
