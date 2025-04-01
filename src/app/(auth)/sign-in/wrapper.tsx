"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "./components/user-auth-form";
import { Icons } from "@/components/icons";
import { SignInOTP } from "./components/otp-form";
import { LogIn } from "lucide-react";
import { useState } from "react";

export default function SignInPageWrapper() {
  const [currentStage, setCurrentStage] = useState(1);
  const [email, setEmail] = useState("");
  const totalStages = 2;

  const nextStage = () => {
    if (currentStage < totalStages) {
      setCurrentStage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStage = () => {
    if (currentStage > 1) {
      setCurrentStage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStageContent = () => {
    switch (currentStage) {
      case 1:
        return (
          <UserAuthForm
            email={email}
            nextStage={nextStage}
            setEmail={setEmail}
          />
        );
      case 2:
        return <SignInOTP prevStage={prevStage} email={email} />;
    }
  };

  return (
    <div className="container relative flex flex-col items-center justify-center md:grid md:h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/sign-up"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        Sign Up Instead
        <LogIn />
      </Link>
      <div className="p-8">{renderStageContent()}</div>
      <div className="relative h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 mb-4 flex items-center text-lg font-medium md:mb-0">
          <Icons.logo className="mr-2 h-8 w-8" />
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
