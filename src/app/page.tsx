import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SideNav } from "./_components/sidenav";
import { Images } from "./_components/images";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="flex w-full">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in to view the gallery
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex">
          <aside className="w-2/12">
            <SideNav />
          </aside>
          <div className="w-10/12">
            <Images />
          </div>
        </div>
      </SignedIn>
    </main>
  );
}
