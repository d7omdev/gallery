"use client";
import { ChevronsUpDown, Folder, Heart, Images, Menu } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <NavigationMenu className="flex list-none flex-col items-start gap-4">
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
            className={`${navigationMenuTriggerStyle()}  mx-auto px-8 text-center`}
          >
            Gallery
          </NavigationMenuLink>
        </CollapsibleContent>
      </Collapsible>
      <NavigationMenuItem>
        <Link href="/" legacyBehavior passHref>
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
      <SheetTrigger className="p-4">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <Nav />
      </SheetContent>
    </Sheet>
  );
}

export function SideNav() {
  return (
    <>
      <div className="hidden p-6 lg:block">
        <Nav />
      </div>
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </>
  );
}
