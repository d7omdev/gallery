import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Images } from "../components/images";
import { UploadButton } from "../components/upload-button";
import { HeroSection } from "~/components/hero";

export const dynamic = "force-dynamic";

function Header() {
  return (
    <div className="flex items-center justify-between p-8">
      <span className="text-4xl font-bold">Gallery</span>
      <UploadButton />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="flex w-full">
      <SignedOut>
        <div className="h-screen w-full">
          <HeroSection />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex w-full flex-col">
          <Header />
          <Images />
        </div>
      </SignedIn>
    </main>
  );
}
