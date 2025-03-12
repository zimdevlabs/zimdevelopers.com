"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { ChevronRight } from "lucide-react";

export default function Phase2({
  setPhase,
}: {
  setPhase: Dispatch<SetStateAction<number>>;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onButtonClick() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPhase(4);
    }, 5000);
  }

  return (
    <div className="p-8">
      <div className="mx-auto h-[500px] md:h-fit flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
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
              disabled={isLoading}
              onClick={onButtonClick}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.gitHub className="mr-2 h-4 w-4" />
              )}{" "}
              GitHub
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              onClick={onButtonClick}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}{" "}
              Google
            </Button>
          </div>
          <Button
            variant={"ghost"}
            className="text-primaryColor font-normal text-sm"
            onClick={() => setPhase(3)}
          >
            Use Work Email
            <ChevronRight className="size-4 mt-0" />
          </Button>
        </div>
      </div>
    </div>
  );
}
