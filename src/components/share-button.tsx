"use client";
import { Copy, ExternalLink, Share } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ImageType } from "./image-grid";

export function ShareButton(image: ImageType) {
  const handleDownload = async (
    url: string,
    fileName: string,
  ): Promise<void> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      link.click();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const shareUrl = `${window.location.hostname}/${image.userId}/${image.id}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>Share this image</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue={shareUrl} readOnly />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={async () => {
                await navigator.clipboard.writeText(shareUrl);
                toast.success("Copied to clipboard");
              }}
            >
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button
            className="items-center gap-2"
            onClick={() => {
              navigator.share({
                title: "Check out this image",
                text: "Check out this image",
                url: `/${image.userId}/${image.id}`,
              });
            }}
          >
            Share Via <ExternalLink />
          </Button>
        </div>
        <DialogFooter className="grid- grid grid-cols-1 gap-3 md:grid-cols-3 ">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="order-last md:order-first"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={() => handleDownload(image.url, image.name)}
          >
            Download
          </Button>
          <Button type="button">
            <Link href={image.url} target="_blank">
              Go to full image
            </Link>
          </Button>
          <button></button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
