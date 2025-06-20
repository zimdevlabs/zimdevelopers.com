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
import { logout } from "@/lib/auth/actions";
import { toast } from "sonner";

type UserTogglerProps = {
  user: User;
};

export default function UserToggler({ user }: UserTogglerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.info("Signed out successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="border-primaryColor cursor-pointer border-2">
          <AvatarImage src={`${user.avatar}`} />
          <AvatarFallback className="text-sm">
            {user.fullName.split(" ")[0][0]}
            {user.fullName.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-sm font-normal opacity-70">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link
            href={
              user.devProfileCompleted
                ? "/developer-workspace/dashboard"
                : "/hiring-workspace/dashboard"
            }
          >
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href="/u/settings">
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
