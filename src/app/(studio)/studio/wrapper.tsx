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
import { User } from "lucia";
import { useState } from "react";

type Props = {
  user: User;
};

export default function StudioWrapper({ user }: Props) {
  const [articleBody, setArticleBody] = useState("");

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <div className="flex h-[100vh] flex-col overflow-y-clip">
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-zinc-200 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
              className="flex items-center gap-4 pr-4 text-sm"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </Tabs>
          </header>
          <div className="relative h-full">
            <div className="relative mx-auto h-full max-h-[calc(100vh-135px)] w-full max-w-[800px] overflow-y-auto border-x border-zinc-200">
              {/* <div className="border-b border-zinc-200 bg-white sticky top-0">
                Header
              </div> */}
              <div className="px-6 py-8">
                <textarea
                  rows={1}
                  name="commentText"
                  id="commentText"
                  className="block w-full resize-none border-0 bg-transparent py-2 text-gray-900 placeholder:text-sm placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
            <footer className="sticky bottom-0 top-full flex items-center justify-between border-t border-zinc-200 bg-white px-4 py-4 md:px-8">
              <div className="text-sm text-zinc-600">Edited 2 hours ago</div>
              <div>
                <Button className="bg-primaryColor">Download</Button>
              </div>
            </footer>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
