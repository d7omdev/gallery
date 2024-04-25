"use client";
import { FolderOutput } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const RemoveImageFromAlbum = ({
  imageId,
  albumId,
}: {
  imageId: string;
  albumId: string;
}) => {
  function clickHandler() {
    axios
      .patch("/api/albums/album/image", { imageId, albumId })
      .then((response) => {
        console.log(response);
        toast.success("Image removed from album");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <button onClick={() => clickHandler()}>
      <FolderOutput className="cursor-pointer" />
    </button>
  );
};

export default RemoveImageFromAlbum;
