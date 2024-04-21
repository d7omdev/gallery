import { SignedIn, SignedOut } from "@clerk/nextjs";
import { FavoriteImages } from "~/components/favoriteimages";

export const dynamic = "force-dynamic";

function Header() {
  return (
    <div className="flex items-center justify-between p-8">
      <span className="text-4xl font-bold">Favorites</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="flex w-full">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in to view Favorite Images
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex w-full flex-col">
          <Header />
          <FavoriteImages />
        </div>
      </SignedIn>
    </main>
  );
}
