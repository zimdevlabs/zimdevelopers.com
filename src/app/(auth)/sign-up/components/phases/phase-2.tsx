"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { ChevronRight } from "lucide-react";

export default function Phase2({
  setPhase,
}: {
  setPhase: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="p-8">
      <div className="mx-auto flex h-[500px] w-full flex-col justify-center space-y-6 sm:w-[350px] md:h-fit">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Connect your account
          </h1>
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/sign-in/github";
              }}
            >
              <Icons.gitHub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/sign-in/google";
              }}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <Button
            variant={"ghost"}
            className="text-sm font-normal text-primaryColor"
            onClick={() => setPhase(3)}
          >
            Use Work Email
            <ChevronRight className="mt-0 size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
