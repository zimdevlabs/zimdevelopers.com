"use client";

import { useState } from "react";
import Link from "next/link";
import LogoIcon from "../icons/logo-icon";
import { Menu } from "lucide-react";
import SearchIcon from "../icons/search-icon";

const navigation = [
  { name: "Developers", href: "#" },
  { name: "Learn", href: "#" },
  { name: "Challenges", href: "#" },
  { name: "Blog", href: "#" },
];

export default function Header() {
  const [, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-zinc-900/10 dark:border-white/10 sticky top-0 z-10">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex flex-1">
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm leading-6 text-zinc-700 hover:text-zinc-900 dark:text-white/80 dark:hover:text-white border-b-2 border-transparent hover:border-secondaryColor"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700 hover:text-zinc-900 dark:text-white/80 dark:hover:text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <LogoIcon className="h-8 w-fit md:hidden ml-3" />
        </div>
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Zim Developers</span>
          <LogoIcon className="h-8 w-fit hidden md:block" />
        </a>
        <div className="flex flex-1 justify-end items-center gap-3 md:gap-4">
          <Link
            href="#"
            className="text-sm bg-primaryColor hover:bg-primaryColor/80 px-4 py-2 rounded-md text-white"
          >
            <span className="hidden md:inline-block">Hire a Develeper</span>
            <span className="md:hidden">Hire&nbsp;Develeper</span>
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
            <SearchIcon className="h-6 w-fit -mt-2" />
          </Link>
        </div>
      </nav>
      {/* <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-1">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-zinc-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <DCLogo className="h-8 w-auto" />
            </a>
            <div className="flex flex-1 justify-end">
              <Link
                href="#"
                className="text-sm font-semibold leading-6 text-zinc-900"
              >
                Log&nbsp;in&nbsp;
                <ArrowRightEndOnRectangleIcon className="h-5 w-auto inline group-hover:text-secondaryColor" />
              </Link>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-zinc-900 hover:bg-zinc-50"
              >
                {item.name}
              </a>
            ))}
          </div>
        </DialogPanel>
      </Dialog> */}
    </header>
  );
}
