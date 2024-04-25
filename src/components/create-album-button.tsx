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
import { Plus } from "lucide-react";

const CreateAlbumButton = () => {
  const [albumName, setAlbumName] = useState("");
  const createAlbumHandler = async (name: string) => {
    if (name.length < 2) {
      console.log("Album name must be at least 2 characters long");
      return toast.error("Album name must be at least 2 characters long");
    }

    try {
      await axios.post("/api/albums/album", {
        name,
      });
      toast.success("Album created successfully");
    } catch (error) {
      console.error("Error creating album", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex gap-1">
          <span>Create album</span>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create album</DialogTitle>
          <DialogDescription>Create new album</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                id="link"
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
              onClick={() => createAlbumHandler(albumName)}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAlbumButton;
