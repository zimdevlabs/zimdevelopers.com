import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BookOpen, Menu, SquareTerminal } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Icons } from "../icons";

const navigation = [
  {
    title: "Developers",
    url: "#",
    icon: SquareTerminal,
    isActive: false,
    items: [
      {
        title: "Solo Developers",
        url: "#",
      },
      {
        title: "Team Developers",
        url: "#",
      },
      {
        title: "Organisations",
        url: "#",
      },
    ],
  },
  {
    title: "Explore",
    url: "#",
    icon: SquareTerminal,
    isActive: false,
    items: [
      {
        title: "Roadmaps",
        url: "#",
      },
      {
        title: "UI Designs",
        url: "#",
      },
      {
        title: "Code Templates",
        url: "#",
      },
      {
        title: "Jobs",
        url: "#",
      },
    ],
  },
];

export default function SideBar() {
  return (
    <Sheet>
      <SheetTrigger>
        <span className="sr-only">Open main menu</span>
        <Menu
          aria-hidden="true"
          className="h-5 w-5 text-zinc-700 hover:text-zinc-900 dark:text-white/80 dark:hover:text-white"
        />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col mt-6 gap-4">
          {navigation.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <div>
                <CollapsibleTrigger asChild>
                  <div className="flex items-center gap-2 text-sm border border-zinc-200 dark:border-white/20 px-2 py-3 rounded-md group-data-[state=open]/collapsible:bg-zinc-200 dark:group-data-[state=open]/collapsible:bg-white/20 ">
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="border-l border-zinc-200 dark:border-white/20 ml-4 pl-4">
                  {item.items?.map((subItem) => (
                    <Link
                      className="block py-3 text-sm"
                      key={subItem.title}
                      href={subItem.url}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
          <div className="w-full border border-zinc-200 dark:border-white/20 rounded-md px-2 py-3 text-sm">
            <div className="flex gap-2 items-center mb-4">
              <BookOpen className="size-4" />
              <span>Blog</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="#"
                className="w-full px-4 py-2 block text-center border border-zinc-200 dark:border-white/20 rounded-md"
              >
                Read
              </Link>
              <Link
                href="#"
                className="w-full px-4 py-2 block text-center bg-zinc-900 dark:bg-primaryColor rounded-md text-white"
              >
                Write
              </Link>
            </div>
          </div>
          <Link
            className="border border-zinc-200 dark:border-white/20 flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
            href="#"
          >
            <Icons.logo className="h-6 w-6" />
            <div className="mb-2 mt-4 text-lg font-medium relative w-fit">
              Dev Teams
              <span className="absolute block px-2 rounded-full bg-violet-600 text-white -top-4 text-xs -right-5">
                new
              </span>
            </div>
            <p className="text-sm leading-tight text-muted-foreground">
              No need to work alone create or join a team of developers you can
              collaborate with
            </p>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
