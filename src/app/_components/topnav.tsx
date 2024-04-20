import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { UploadButton } from "./upload-button";

export default function TopNav() {
  return (
    <nav
      className=" sticky top-0  z-10 flex w-full items-center justify-between border-b border-gray-800 bg-background/50 p-4  text-xl font-semibold"
      style={{ backdropFilter: "blur(10px)" }}
    >
      <Link href="/">
        <div>Gallery</div>
      </Link>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
