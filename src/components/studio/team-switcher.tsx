"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { GroupType, UserType } from "@/demo/data";
import Image from "next/image";
import {
  getGroupRatings,
  getUserGroup,
  getUserRatings,
} from "@/lib/actions/group";
import { StarRating } from "../star-rating";

export function TeamSwitcher({ user }: { user: UserType }) {
  const userGroup = user.groupId ? getUserGroup(user.groupId) : null;
  const { isMobile } = useSidebar();

  const defaultGroup: GroupType = {
    _type: "solo",
    avatar: user.avatar,
    id: user._id,
    name: user.name,
    tagLine: "N/A",
  };

  const groups: GroupType[] = userGroup
    ? [defaultGroup, userGroup]
    : [defaultGroup];

  const [activeGroup, setActiveGroup] = React.useState<GroupType>(defaultGroup);
  const ratings =
    activeGroup._type == "solo"
      ? getUserRatings(activeGroup.id)
      : getGroupRatings(activeGroup.id);

  const rating = React.useMemo(() => {
    if (ratings.length === 0) {
      return 0;
    }
    const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return sum / ratings.length;
  }, [ratings]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Image
                  src={activeGroup.avatar}
                  alt={activeGroup.name}
                  height={50}
                  width={50}
                  className="size-4"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeGroup.name}
                </span>
                <div className="flex items-center">
                  <StarRating rating={rating} size={14} />
                </div>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Groups
            </DropdownMenuLabel>
            {groups.map((group, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setActiveGroup(group)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Image
                    src={group.avatar}
                    className="size-4 shrink-0"
                    alt={group.name}
                    height={50}
                    width={50}
                  />
                </div>
                {group.name}
                <DropdownMenuShortcut>{group._type}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            {!user.groupId && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Join a Team
                  </div>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
