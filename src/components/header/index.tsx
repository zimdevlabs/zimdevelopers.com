import Link from "next/link";
import SideBar from "./sidebar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Icons } from "../icons";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Roadmaps",
    href: "#",
    description:
      "Find a straight forward learning path and track your progress",
  },
  {
    title: "UI Designs",
    href: "#",
    description:
      "Get inspiration or show off your work as part of your portfolio.",
  },
  {
    title: "Code Templates",
    href: "#",
    description:
      "No need to start from scratch, use premade templates from other developers.",
  },
  {
    title: "Projects",
    href: "#",
    description: "Post a project or request to take part in open projects.",
  },
];

export default function Header() {
  return (
    <header className="bg-background border-b border-zinc-900/10 dark:border-white/10 sticky top-0 z-10">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex flex-1">
          <div className="hidden lg:flex lg:gap-x-6">
            <Button
              variant="outline"
              className="text-zinc-700 hover:text-zinc-900 dark:text-white/80 dark:hover:text-white"
            >
              Write Article
            </Button>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <Icons.logo className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium relative">
                              Dev Teams
                              <span className="absolute block px-2 rounded-full bg-violet-600 text-white -top-4 text-xs right-4">
                                new
                              </span>
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              No need to work alone create or join a team of
                              developers you can collaborate with
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="#" title="Solo Developers">
                        Developers who mostly work alone
                      </ListItem>
                      <ListItem href="#" title="Team Developers">
                        Developers who work in groups.
                      </ListItem>
                      <ListItem href="#" title="Organisations">
                        Software development companies
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/docs" legacyBehavior passHref>
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
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Zim Developers</span>
          <Icons.logo className="h-8 w-fit hidden md:block" />
        </a>
        <div className="flex flex-1 justify-end items-center gap-3 md:gap-4">
          <Link
            href="#"
            className="text-sm bg-primaryColor hover:bg-primaryColor/80 px-4 py-2 rounded-md text-white"
          >
            <span className="hidden md:inline-block">Find a Developer</span>
            <span className="md:hidden">Find&nbsp;Developer</span>
          </Link>
          <Link
            href="#"
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
ListItem.displayName = "ListItem";
