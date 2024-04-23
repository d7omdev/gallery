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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "~/components/ui/sheet";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
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
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="space-y-2 "
      >
        <CollapsibleTrigger asChild className="cursor-pointer">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Folder size={24} />
            <span className="pl-2 pr-20 font-semibold">Albums</span>
          </NavigationMenuLink>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex items-center">
          <NavigationMenuLink
            className={`${navigationMenuTriggerStyle()}  mx-auto w-5/6 text-center`}
          >
            Gallery
          </NavigationMenuLink>
        </CollapsibleContent>
      </Collapsible>
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet>
      <SheetTrigger className="z-50  mt-2 pl-2">
        <Menu className=" rounded-sm bg-black/50 backdrop-blur-sm " />
      </SheetTrigger>
      <SheetContent className="w-3/5">
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
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2 "
          >
            <CollapsibleTrigger asChild className="cursor-pointer">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Folder size={24} />
                <span className="pl-2 pr-20 font-semibold">Albums</span>
              </NavigationMenuLink>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex items-center">
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()}  mx-auto w-5/6 text-center`}
              >
                album
              </NavigationMenuLink>
            </CollapsibleContent>
          </Collapsible>
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
      <div className=" sticky top-0 lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
