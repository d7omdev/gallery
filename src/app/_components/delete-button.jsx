"use client";
import { Button } from "~/components/ui/button";

export default function DeleteButton() {
  return (
    <Button
      type="submit"
      onClick={() => (document.body.style.overflow = "auto")}
      variant="destructive"
    >
      Delete
    </Button>
  );
}
