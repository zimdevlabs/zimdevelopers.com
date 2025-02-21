"use client";

import {
  BookMarked,
  Folder,
  Forward,
  MoreHorizontal,
  Scale,
  Telescope,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

const projects = [
  {
    name: "Publishing Policies",
    url: "#",
    icon: Scale,
  },
  {
    name: "Explore Articles",
    url: "#",
    icon: Telescope,
  },
];

export function NavProjects() {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Learn</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Dialog>
            <DialogTrigger asChild>
              <SidebarMenuButton asChild>
                <div className="cursor-pointer">
                  <BookMarked />
                  <span>Studio Basics</span>
                </div>
              </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader className="h-fit">
                <DialogTitle>Studio Basics</DialogTitle>
                <DialogDescription>
                  Here’s a selection of commonly used markdown syntax. Want to
                  learn more? This{" "}
                  <Link href="#" className="text-primaryColor">
                    cheat sheet
                  </Link>{" "}
                  has you covered.
                </DialogDescription>
              </DialogHeader>
              <div className="w-full bg-zinc-50  h-[calc(100vh-200px)] rounded-md px-4 py-6 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">
                  Markdown Syntax Guide
                </h2>

                <section className="mb-6">
                  <h3 className="text-lg mb-2">Headers</h3>
                  <pre className="bg-white p-2 rounded border overflow-x-hidden">
                    # H1 ## H2 ### H3 #### H4 ##### H5 ###### H6
                  </pre>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg mb-2">Emphasis</h3>
                  <pre className="bg-white p-2 rounded border overflow-x-hidden">
                    *italic* or _italic_ **bold** or __bold__ ***bold italic***
                    or ___bold italic___
                  </pre>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg mb-2">Lists</h3>
                  <pre className="bg-white p-2 rounded border overflow-x-hidden">
                    Unordered: - Item 1 - Item 2 - Subitem 2.1 - Subitem 2.2
                    Ordered: 1. First item 2. Second item 3. Third item
                  </pre>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg mb-2">Links</h3>
                  <pre className="bg-white p-2 rounded border overflow-x-hidden">
                    [Link text](https://www.example.com) [Link with
                    title](https://www.example.com &quot;Title text&quot;)
                  </pre>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg mb-2">Images</h3>
                  <pre className="bg-white p-2 rounded border overflow-x-hidden">
                    ![Alt text](image-url.jpg) ![Alt text](image-url.jpg
                    &quot;Optional title&quot;)
                  </pre>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg mb-2">Blockquotes</h3>
                  <pre className="bg-white p-2 rounded border overflow-x-hidden">
                    &gt; This is a blockquote &gt; It can span multiple lines
                  </pre>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg mb-2">Code</h3>
                  <pre className="bg-white p-2 rounded border overflow-x-hidden">
                    Inline code: `code` Code block: ``` function example() {"{"}
                    console.log(&quot;Hello, world!&quot;);
                    {"}"}
                    ```
                  </pre>
                </section>

                <section className="mb-6">
                  <h3 className="text-lg mb-2">Horizontal Rule</h3>
                  <pre className="bg-white p-2 rounded border overflow-x-hidden">
                    --- or *** or ___
                  </pre>
                </section>

                <p className="text-sm text-gray-600 mt-4">
                  NB, you can contribute to the Markdown processor to add more
                  variations in syntax support. Always refer to the specific
                  documentation before making a pull request.
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction showOnHover>
                <MoreHorizontal />
                <span className="sr-only">More</span>
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align={isMobile ? "end" : "start"}
            >
              <DropdownMenuItem>
                <Folder className="text-muted-foreground" />
                <span>View Project</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Forward className="text-muted-foreground" />
                <span>Share Project</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Trash2 className="text-muted-foreground" />
                <span>Delete Project</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
