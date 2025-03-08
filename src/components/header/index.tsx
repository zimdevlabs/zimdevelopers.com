import Link from "next/link";
import SideBar from "./sidebar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Icons } from "../icons";
import React from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="bg-background border-b border-zinc-900/10 dark:border-white/10 sticky top-0 z-10">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex flex-1">
          <div className="hidden lg:flex lg:gap-x-6">
            <Link
              href="/studio"
              className="text-zinc-700 block px-4 py-2 border border-zinc-200 hover:bg-zinc-200 dark:border-white/20 dark:hover:bg-white/20 text-sm rounded-md  hover:text-zinc-900 dark:text-white/80 dark:hover:text-white"
            >
              Write Article
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/blog" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex lg:hidden">
            <SideBar />
          </div>
          <Icons.logo className="h-8 w-fit md:hidden ml-3" />
        </div>
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Zim Developers</span>
          <Icons.logo className="h-8 w-fit hidden md:block" />
        </Link>
        <div className="flex flex-1 justify-end items-center gap-3 md:gap-4">
          <Link
            href="/sign-up"
            className="text-sm bg-primaryColor hover:bg-primaryColor/80 px-4 py-2 rounded-md text-white"
          >
            <span className="hidden md:inline-block">Create Free Account</span>
            <span className="md:hidden">Create&nbsp;Account</span>
          </Link>
          <Link
            href="/sign-in"
            className="text-sm leading-6 text-zinc-700 hover:text-zinc-900 dark:text-white/80 dark:hover:text-white group"
          >
            Log&nbsp;in&nbsp;
          </Link>
          <Link
            href="#"
            className="text-zinc-700 hover:text-zinc-900 dark:text-white/80 dark:hover:text-white"
          >
            <Icons.search className="h-6 w-fit -mt-2" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
          <span className="text-sm text-primaryColor absolute top-0 right-2">
            Register
          </span>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const ListItem2 = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem2.displayName = "ListItem2";
