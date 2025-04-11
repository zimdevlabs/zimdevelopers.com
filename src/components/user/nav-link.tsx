"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export default function NavLink({ className, href, children }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        className,
        pathname?.includes(href) ? "text-primaryColor" : ""
      )}
    >
      {children}
    </Link>
  );
}
