"use client";

import { Button } from "@/components/ui/button";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Drill } from "lucide-react";

export default function DeveloperDashboardWrapper() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Drill className="h-10 w-fit text-zinc-500" strokeWidth={1} />
      <p className="text-xl">Product under construction</p>
      <Button
        onClick={() =>
          window.open("https://discord.com/invite/ZPTtkVt58H", "_blank")
        }
        className="flex items-center gap-2"
      >
        Join Developer Discord <ArrowTopRightOnSquareIcon />
      </Button>
    </div>
  );
}
