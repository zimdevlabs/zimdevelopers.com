"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Phase2 from "./components/phases/phase-2";
import Phase1 from "./components/phases/phase-1";
import { useState } from "react";
import { Phase3 } from "./components/phases/phase-3";
import Phase4 from "./components/phases/phase-4";

export default function SignUpPageWrapper() {
  const [phase, setPhase] = useState(1);
  const [speciality, setSpeciality] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="container relative md:h-screen flex flex-col-reverse items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/sign-in"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium mb-4 md:mb-0">
          <Icons.logo className="h-8 w-8 mr-2" />
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
      {phase == 1 && (
        <Phase1
          setPhase={setPhase}
          setName={setName}
          setSpeciality={setSpeciality}
          speciality={speciality}
        />
      )}
      {phase == 2 && <Phase2 setPhase={setPhase} />}
      {phase == 3 && <Phase3 setPhase={setPhase} setEmail={setEmail} />}
      {phase == 4 && (
        <Phase4
          setPhase={setPhase}
          email={email}
          name={name}
          speciality={speciality}
        />
      )}
    </div>
  );
}
