import { DeveloperSidebar } from "@/components/developer-sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  AlertTriangle,
  Bell,
  Briefcase,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

export default function DeveloperWorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DeveloperSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="font-medium">Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2 rounded-md border border-zinc-200 p-2 hover:bg-zinc-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-medium">Developer workspace</p>
                    <p className="text-muted-foreground text-xs">
                      Tino Mazorodze
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 text-sm">
                <div className="flex items-center gap-3 border-b p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Developer workspace</p>
                    <p className="text-muted-foreground text-sm">
                      Tino Mazorodze
                    </p>
                  </div>
                </div>

                <div className="py-2">
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-purple-100">
                      <Briefcase className="h-3 w-3 text-purple-600" />
                    </div>
                    <span>Portfolio</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2">
                    <Settings className="h-5 w-5 text-gray-600" />
                    <span>Settings</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <span>Set availability</span>
                  </DropdownMenuItem>
                </div>

                <div className="border-t">
                  <div className="px-3 py-2">
                    <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                      Switch Workspace
                    </p>
                  </div>
                  <DropdownMenuItem
                    asChild
                    className="mb-2 flex items-center gap-3 px-3 py-2"
                  >
                    <Link href="/hiring-workspace/dashboard">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Hiring workspace</p>
                        <p className="text-muted-foreground text-sm">
                          Tino Mazorodze
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </DropdownMenuItem>
                </div>

                <div className="border-t py-2">
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2">
                    <HelpCircle className="h-5 w-5 text-gray-600" />
                    <span>Help</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2">
                    <LogOut className="h-5 w-5 text-gray-600" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
