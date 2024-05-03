"use client";
import { Folder, Heart, Images, Menu } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "~/components/ui/sheet";

function Nav() {
  return (
    <NavigationMenu className=" flex list-none flex-col items-start gap-4">
      <span className="pl-2 text-xl font-bold lg:block">Manage</span>
      <NavigationMenuItem>
        <Link href="/" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Images size={24} />
            <span className="pl-2 pr-20 font-semibold">Gallery</span>
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/albums" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Folder size={24} />
            <span className="pl-2 pr-20 font-semibold">Albums</span>
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/favorites" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Heart size={24} />
            <span className="pl-2 pr-20 font-semibold">Favorites</span>
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="z-50 mt-2 pl-2 ">
        <Menu
          height={25}
          width={25}
          className=" rounded-sm bg-black/50 backdrop-blur-sm "
        />
      </SheetTrigger>
      <SheetContent className=" overflow-hidden">
        <NavigationMenu className="  list-none flex-col items-start gap-4 md:flex">
          <span className="pl-2 text-xl font-bold lg:block">Manage</span>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <SheetClose className="flex">
                  <Images size={24} />
                  <span className="pl-2 pr-20 font-semibold">Gallery</span>
                </SheetClose>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/albums" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <SheetClose className="flex">
                  <Folder size={24} />
                  <span className="pl-2 pr-20 font-semibold">Albums</span>
                </SheetClose>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/favorites" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Heart size={24} />{" "}
                <SheetClose className="flex">
                  <span className="pl-2 pr-20 font-semibold">Favorites</span>
                </SheetClose>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
}

export function SideNav(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <div className="sticky top-0 hidden p-6 lg:block">
        <Nav />
      </div>
      <div className=" sticky top-2 lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
