"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const navlinks = [
  { id: 1, name: "Dashboard", slug: "/user/profile" },
  { id: 3, name: "Leaderboard", slug: "#" },
  { id: 5, name: "Settings", slug: "/user/settings" },
];

export default function MobileNav({ username }: { username: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const activeNavItem = navlinks.find((item) => item.slug === pathname);
  const dropdownRef = useRef(null);

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // @ts-expect-error -- Property 'contains' does not exist on type 'never'.
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle navigation to selected item
  const handleNavItemClick = (slug: string) => {
    if (slug == "/user/profile") {
      router.push(`/user/${username}`);
    }
    router.push(slug);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative mx-auto px-4 md:hidden" ref={dropdownRef}>
      {/* Active Item Display */}
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-gray-100 px-4 py-3"
        onClick={toggleDropdown}
      >
        <span className="text-sm text-gray-700">
          {activeNavItem ? activeNavItem.name : "Select Tab"}
        </span>
        <span className="text-gray-500">
          {isOpen ? (
            <ChevronUpIcon className="h-4 w-fit" />
          ) : (
            <ChevronDownIcon className="h-4 w-fit" />
          )}
        </span>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute left-4 right-4 z-10 mt-2 rounded-lg border border-gray-300 bg-white p-2 shadow-lg">
          {navlinks.map((item) => (
            <div
              key={item.id}
              className={`flex cursor-pointer items-center gap-2 rounded-md p-2 ${
                pathname === item.slug
                  ? "bg-primaryColor"
                  : "hover:bg-primaryColor/20"
              }`}
              onClick={() => handleNavItemClick(item.slug)}
            >
              {pathname === item.slug && <CheckIcon className="h-4 w-fit" />}
              <span className="text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
