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
import { User } from "lucia";
import SignCTA from "./sign-cta";
import UserToggler from "./user-toggler";

type HeaderProps = {
  user: User | null;
};

export default function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-900/10 bg-background dark:border-white/10">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex flex-1">
          <div className="hidden lg:flex lg:gap-x-6">
            <Link
              // href="/studio" temporarily disabled go directly to github
              href="https://github.com/zimdevlabs/zimdevelopers.com/tree/main/src/content/blog"
              className="block rounded-md border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 dark:border-white/20 dark:text-white/80 dark:hover:bg-white/20 dark:hover:text-white"
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
          <Icons.logo className="ml-3 h-8 w-fit md:hidden" />
        </div>
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Zim Developers</span>
          <Icons.logo className="hidden h-8 w-fit md:block" />
        </Link>
        <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">
          {!user && <SignCTA />}
          <Link
            href="#"
            className="text-zinc-700 hover:text-zinc-900 dark:text-white/80 dark:hover:text-white"
          >
            <Icons.search className="-mt-2 h-6 w-fit" />
          </Link>
          {user && <UserToggler user={user} />}
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
            "relative block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
          <span className="absolute right-2 top-0 text-sm text-primaryColor">
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
            className,
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
