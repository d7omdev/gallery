import { Modal } from "./modal";
import FullPageImage from "~/components/full-image-page";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = parseInt(photoId);
  if (isNaN(idAsNumber)) throw new Error("Invalid ID");

  return (
    <Modal>
      <FullPageImage id={idAsNumber} />
    </Modal>
  );
}
