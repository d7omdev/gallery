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
import { PenLine } from "lucide-react";
import { useRouter } from "next/navigation";

const UpdateImageName = ({
  imageId,
  currentName,
}: {
  imageId: string;
  currentName: string;
}) => {
  const router = useRouter();
  const [imageName, setImageName] = useState("");
  const renameimageHandler = async (name: string) => {
    if (name.length < 2) {
      return toast.error("Image name must be at least 2 characters long");
    }
    if (imageName.length > 20) {
      return toast.error("Image name must be at most 20 characters long");
    }

    try {
      await axios.patch("/api/image", {
        imageId,
        newName: name,
      });
      toast.success("Image Renamed Successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error Renaming image", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PenLine
          className="ml-1 cursor-pointer text-gray-500 transition-all duration-200 ease-in-out hover:text-white"
          size={18}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename image</DialogTitle>
          <DialogDescription>Update image name</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                defaultValue={currentName}
                onChange={(e) => {
                  setImageName(e.target.value);
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
              onClick={() => renameimageHandler(imageName)}
            >
              Rename
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateImageName;
