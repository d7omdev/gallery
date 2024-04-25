"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";

const UpdateAlbumName = ({
  albumId,
  currentName,
}: {
  albumId: string;
  currentName: string;
}) => {
  const router = useRouter();
  const [albumName, setAlbumName] = useState("");
  const renameAlbumHandler = async (name: string) => {
    if (name.length < 2) {
      return toast.error("Album name must be at least 2 characters long");
    }
    if (albumName.length > 20) {
      return toast.error("Album name must be at most 20 characters long");
    }

    try {
      await axios.put("/api/albums/album", {
        albumId,
        newName: name,
      });
      toast.success("Album Renamed Successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error Renaming album", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="justify center flex w-full gap-2">
          <Pen />
          <span className="hidden md:block">Rename album</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename album</DialogTitle>
          <DialogDescription>Update album name</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                defaultValue={currentName}
                onChange={(e) => {
                  setAlbumName(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="grid  grid-cols-1 place-items-center gap-3 md:grid-cols-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="order-last w-full md:order-first"
            >
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              className=" w-full"
              onClick={() => renameAlbumHandler(albumName)}
            >
              Rename
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAlbumName;
