import Link from "next/link";
import { ArrowRight, Code, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GetStartedWrapper() {


  //bg-zinc-50

  return (
    <div className="grid grid-cols-1 min-h-screen bg-zinc-50 justify-items-center">
      <main className="flex-1 w-6xl">
        <section className="container px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="text-2xl tracking-wider sm:text-3xl md:text-4xl">
              Welcome to Zim Developers
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Tell us what brings you here today so we can help you get started
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {/* Hiring Option */}
            <Card className="flex h-full flex-col transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="bg-primary/10 mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                  <Users className="text-primary h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-light md:text-2xl">
                  I'm hiring developers
                </CardTitle>
                <CardDescription>
                  Find skilled developers for your projects
                </CardDescription>
              </CardHeader>
              <CardContent className="flex- hidden md:block">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Post job opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Browse developer profiles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Connect with talent that matches your needs</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/hiring">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Developer Option */}
            <Card className="flex h-full flex-col transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="bg-primary/10 mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                  <Code className="text-primary h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-light md:text-2xl">
                  I'm a developer
                </CardTitle>
                <CardDescription>
                  Showcase your skills and find opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden flex-1 md:block">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Create your developer profile</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Showcase your portfolio and skills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Connect with potential employers</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/developers">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
