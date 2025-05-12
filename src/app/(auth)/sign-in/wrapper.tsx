"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { LogIn } from "lucide-react";
import SignInPageForm from "./form";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function SignInPageWrapper({
  callbackUrl,
}: {
  callbackUrl?: string;
}) {
  return (
    <div className="relative container flex flex-col items-center justify-center md:grid md:h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative flex h-full flex-col items-center justify-center">
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute top-4 right-4 md:top-8 md:right-8",
          )}
        >
          Sign Up Instead
          <LogIn />
        </Link>
        {callbackUrl && (
          <button
            onClick={() => window.open(callbackUrl, "_self")}
            className="absolute top-4 left-4 grid h-8 w-8 place-content-center rounded-full border border-zinc-100 bg-zinc-50 p-2 text-zinc-400 hover:text-zinc-600 md:right-full"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
        <div className="p-8">
          <SignInPageForm callbackUrl={callbackUrl} />
        </div>
      </div>
      <div className="bg-muted relative h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 mb-4 flex items-center text-lg font-medium md:mb-0">
          <Icons.logoIcon className="mr-2 h-8 w-8" />
          Zim Dev Labs
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;At first I thought it was a waste of time but the idea of
              joining and helping build a developer platform has awoken a spark
              in me.&rdquo;
            </p>
            <footer className="text-sm text-teal-400">Future Zoma</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
