"use client";

import { AppSidebar } from "@/components/studio/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserType } from "@/demo/data";
import { useState } from "react";

type Props = {
  user: UserType;
};

export default function StudioWrapper({ user }: Props) {
  const [articleBody, setArticleBody] = useState("");

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <div className="h-[100vh] flex flex-col overflow-y-clip">
          <header className="border-b border-zinc-200 flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Blog</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>New Article</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <Tabs
              defaultValue="edit"
              className="pr-4 flex items-center gap-4 text-sm"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </Tabs>
          </header>
          <div className="h-full relative">
            <div className="max-w-[800px] mx-auto w-full border-x border-zinc-200 relative h-full max-h-[calc(100vh-135px)] overflow-y-auto">
              {/* <div className="border-b border-zinc-200 bg-white sticky top-0">
                Header
              </div> */}
              <div className="px-6 py-8">
                <textarea
                  rows={1}
                  name="commentText"
                  id="commentText"
                  className="block w-full placeholder:text-sm resize-none border-0 bg-transparent py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Start writing..."
                  minLength={2}
                  maxLength={500}
                  value={articleBody}
                  onChange={(e) => {
                    setArticleBody(e.target.value);
                  }}
                  onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                    e.currentTarget.style.height = "auto"; // Reset height
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Adjust height to content
                  }}
                />
              </div>
            </div>
            <footer className="sticky bottom-0 top-full border-t border-zinc-200 flex items-center justify-between py-4 bg-white px-4 md:px-8">
              <div className="text-sm text-zinc-600">Edited 2 hours ago</div>
              <div>
                <Button className="bg-primaryColor">Publish</Button>
              </div>
            </footer>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
