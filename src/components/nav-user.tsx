"use client";

import { Info } from "lucide-react";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import Image from "next/image";

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* Ad */}
        <div className="rounded-md bg-zinc-900 p-2 sm:p-4">
          <div className="text-muted-foreground mb-2 flex items-center gap-1 text-xs">
            <Info className="h-3 w-3" />
            <span>Advertisement</span>
          </div>
          <Image
            src="/ads/ibzim-ad.png"
            alt="IBZIM Advertisement"
            className="rounded-md"
            width={640}
            height={360}
          />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
