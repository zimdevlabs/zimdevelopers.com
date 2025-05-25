import Link from "next/link";
import { Code, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/navbar/logo";
import { Icons } from "@/components/icons";

type PathsCardsProps = {
  nextStage: () => void;
  isHiring: boolean;
  isDeveloper: boolean;
  setIsHiring: (value: boolean) => void;
  setIsDeveloper: (value: boolean) => void;
};

export default function PathsCards({
  nextStage,
  setIsDeveloper,
  setIsHiring,
  isDeveloper,
  isHiring,
}: PathsCardsProps) {
  return (
    <div className="mx-auto w-full lg:max-w-lg">
      <main className="flex-1">
        <section className="container w-full px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl">
            <Link href="/" className="mx-auto flex items-center justify-center">
              <Logo className="hidden h-10 w-auto md:block" />
              <Icons.logoIcon className="block h-10 w-auto md:hidden" />
            </Link>
            <h1 className="mt-8 text-2xl/9 font-medium">
              What brings you here?
            </h1>
            <p className="text-muted-foreground mt-3 text-sm">
              Tell us what brings you here today so we can help you get started
            </p>
          </div>

          <div className="mx-auto">
            {/* Hiring Option */}
            <Card
              className={`flex h-full cursor-pointer flex-col rounded-b-none transition-all hover:shadow-md ${
                isHiring ? "border-primaryColor bg-secondaryColor border-2" : ""
              }`}
              onClick={() => {
                setIsHiring(!isHiring);
                setIsDeveloper(false);
              }}
            >
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50">
                  <Users className="text-primary h-5 w-5" strokeWidth={1} />
                </div>
                <CardTitle className="text-lg font-light md:text-xl">
                  I&#39;m hiring developers
                </CardTitle>
                <CardDescription>
                  Find skilled developers for your projects
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Developer Option */}
            <Card
              className={`flex h-full cursor-pointer flex-col rounded-t-none transition-all hover:shadow-md ${
                isDeveloper
                  ? "border-primaryColor bg-secondaryColor border-2"
                  : ""
              }`}
              onClick={() => {
                setIsDeveloper(!isDeveloper);
                setIsHiring(false);
              }}
            >
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50">
                  <Code className="text-primary h-5 w-5" strokeWidth={1} />
                </div>
                <CardTitle className="text-lg font-light md:text-xl">
                  I&#39;m a developer
                </CardTitle>
                <CardDescription>
                  Showcase your skills and find opportunities
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="mt-8 flex w-full items-center">
            <Button
              className="mx-auto px-10"
              disabled={!isHiring && !isDeveloper}
              onClick={() => {
                if (isHiring || isDeveloper) {
                  nextStage();
                }
              }}
            >
              Continue
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
