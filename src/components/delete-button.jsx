"use client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { DialogClose } from "./ui/dialog";
import { Button } from "~/components/ui/button";
import { LoadingSpinnerSVG } from "./LoadingSpinner";

export default function DeleteButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            image!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            type="submit"
            onClick={() => {
              toast(
                <div className="flex items-center gap-2 text-white">
                  <LoadingSpinnerSVG />{" "}
                  <span className=" text-lg">Deleting...</span>
                </div>,
                {
                  duration: 1200,
                  id: "upload-begin",
                },
              );
              const deleteForm = document.getElementById("deleteForm");
              if (deleteForm instanceof HTMLFormElement) {
                deleteForm.requestSubmit();
              }
            }}
          >
            <DialogClose>Continue</DialogClose>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
