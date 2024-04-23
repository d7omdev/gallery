"use client";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

function LoadingSpinnerSVG() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
        className="spinner_ajPY"
      />
    </svg>
  );
}

export default function DeleteButton() {
  const deleting = () => {
    toast(
      <div className="flex items-center gap-2 text-white">
        <LoadingSpinnerSVG /> <span className=" text-lg">Deleting...</span>
      </div>,
      {
        duration: 1000,
      },
    );
  };

  const confirm = () => {
    toast("Are you sure?", {
      action: {
        label: "Yes, Delete!",
        onClick: () => deleting(),
      },
    });
  };
  return (
    <Button type="submit" onClick={() => confirm} variant="destructive">
      Delete
    </Button>
  );
}
