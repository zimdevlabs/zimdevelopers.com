"use client";

import { User } from "lucia";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { logout } from "@/app/(auth)/actions";
import { toast } from "react-toastify";

type UserTogglerProps = {
  user: User;
};

export default function UserToggler({ user }: UserTogglerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast("Signed out successfully", {
        type: "info",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message, {
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={`${user.avatar}`} />
          <AvatarFallback>
            {user.name.split(" ")[0][0]}
            {user.name.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-sm font-normal opacity-70">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/user/${user.username}`}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href="/user/settings">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignout} disabled={isLoading}>
          {isLoading ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
