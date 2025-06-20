"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Icons } from "./icons";

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Platform",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "Community",
          url: "#",
        },
        {
          title: "Messages",
          url: "#",
        },
      ],
    },
    {
      title: "Leads",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Discover",
          url: "#",
        },
        {
          title: "Network",
          url: "#",
        },
        {
          title: "Job",
          url: "#",
        },
      ],
    },
    {
      title: "Projects & Payments",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Projects",
          url: "#",
        },
        {
          title: "Payments",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
      ],
    },
  ],
};

export function DeveloperSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Icons.logoIcon className="h-8 w-fit" />
          <span className="text-lg font-light">Zim Developers</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
