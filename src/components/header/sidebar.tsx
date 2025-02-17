import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

export default function SideBar() {
  return (
    <Drawer>
      <DrawerTrigger>
        <span className="sr-only">Open main menu</span>
        <Menu
          aria-hidden="true"
          className="h-5 w-5 text-zinc-700 hover:text-zinc-900 dark:text-white/80 dark:hover:text-white"
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="h-[50vh]">s</div>
        <DrawerFooter>
          <div className="flex gap-4">
            <Button className="w-full">Login</Button>
            <DrawerClose>
              <Button variant="outline" className="w-fit px-4">
                <X className="size-5 " />
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
