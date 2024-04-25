"use client";
import axios from "axios";
import * as React from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { AlbumType } from "~/types";
import { toast } from "sonner";

export default function AddToButton({ imageId }: { imageId: string }) {
  const [albums, setAlbums] = React.useState<AlbumType[]>([]);

  React.useEffect(() => {
    axios
      .get("/api/albums")
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error("Error fetching albums", error);
      });
  }, []);

  const CheckHandler = (albumId: string) => {
    const albumImages = albums.find((album) => album.id === albumId)?.imageIds;
    if (albumImages?.includes(imageId)) {
      return toast.error("Image already in album");
    }
    try {
      axios.post("/api/albums/album/image", {
        albumId: albumId,
        imageId: imageId,
      });
      toast.success(`Image added to album`);
    } catch (error) {
      console.error("Error adding image to album", error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Plus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Add To Album</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!albums ? (
          <div>No albums yet</div>
        ) : (
          albums.map((album, index) => (
            <DropdownMenuItem
              key={album.id}
              onClick={() => {
                CheckHandler(album.id);
              }}
            >
              {album.name}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
