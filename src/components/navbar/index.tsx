"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Link } from "./link";
import { Logo } from "./logo";
import { PlusGrid, PlusGridItem, PlusGridRow } from "./plus-grid";
import { User } from "lucia";
import UserToggler from "./user-toggler";

const links = [
  { href: "#", label: "For Developers" },
  { href: "#", label: "For Employers" },
];

const signLinks = [
  { href: "/sign-up", label: "Sign Up", isPrimary: true },
  { href: "/sign-in", label: "Log in" },
];

function DesktopNav({ user }: { user?: User }) {
  return (
    <nav className="relative hidden lg:flex">
      {links.map(({ href, label }) => (
        <PlusGridItem key={label} className="relative flex">
          <Link
            href={href}
            className={`flex items-center px-4 py-3 text-base text-zinc-950 bg-blend-multiply data-hover:bg-black/[2.5%]`}
          >
            {label}
          </Link>
        </PlusGridItem>
      ))}
      {!user &&
        signLinks.map(({ href, label, isPrimary }) => (
          <PlusGridItem key={label} className="relative flex">
            <Link
              href={href}
              className={`flex items-center px-4 py-3 text-base bg-blend-multiply ${isPrimary ? "bg-black text-white data-hover:bg-black/80" : "text-zinc-950 data-hover:bg-black/[2.5%]"}`}
            >
              {label}
            </Link>
          </PlusGridItem>
        ))}
      {user && (
        <PlusGridItem className="relative flex">
          <div className="flex items-center px-4 py-3 text-base text-zinc-950 bg-blend-multiply data-hover:bg-black/[2.5%]">
            <UserToggler user={user} />
          </div>
        </PlusGridItem>
      )}
    </nav>
  );
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg data-hover:bg-black/5 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6" />
    </DisclosureButton>
  );
}

function MobileNav() {
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="flex flex-col gap-6 py-4">
        {links.map(({ href, label }, linkIndex) => (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
              rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
            }}
            key={href}
          >
            <Link href={href} className="text-base font-medium text-zinc-950">
              {label}
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="absolute left-1/2 w-screen -translate-x-1/2">
        <div className="absolute inset-x-0 top-0 border-t border-black/5" />
        <div className="absolute inset-x-0 top-2 border-t border-black/5" />
      </div>
    </DisclosurePanel>
  );
}

export function Navbar({
  banner,
  user,
}: {
  banner?: React.ReactNode;
  user?: User;
}) {
  return (
    <Disclosure as="header" className="pt-12 sm:pt-16">
      <PlusGrid>
        <PlusGridRow className="relative flex justify-between">
          <div className="relative flex gap-6">
            <PlusGridItem className="py-3">
              <Link href="/" title="Home">
                <Logo className="h-9" />
              </Link>
            </PlusGridItem>
            {banner && (
              <div className="relative hidden items-center py-3 lg:flex">
                {banner}
              </div>
            )}
          </div>
          <DesktopNav user={user} />
          <MobileNavButton />
        </PlusGridRow>
      </PlusGrid>
      <MobileNav />
    </Disclosure>
  );
}
