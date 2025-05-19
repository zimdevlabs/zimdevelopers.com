"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Linkedin, LinkIcon, PlusCircle, X } from "lucide-react";
import { useState } from "react";

type DeveloperFormProps = {
  prevStage: () => void;
};

export default function DeveloperForm2({ prevStage }: DeveloperFormProps) {
  const [additionalLinks, setAdditionalLinks] = useState<string[]>([]);

  const handleAddLink = () => {
    setAdditionalLinks([...additionalLinks, ""]);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = [...additionalLinks];
    newLinks.splice(index, 1);
    setAdditionalLinks(newLinks);
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...additionalLinks];
    newLinks[index] = value;
    setAdditionalLinks(newLinks);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Button
        variant="outline"
        onClick={prevStage}
        className="absolute top-4 left-4 cursor-pointer bg-zinc-100 px-8 text-zinc-800"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <div className="px-8 pt-16">
        <div className="mx-auto mt-12 w-full lg:w-96">
          <div>
            <span className="mb-4 block text-xs text-zinc-600 md:text-sm">
              Step 2/2
            </span>
            <h1 className="mb-8 text-2xl">Add Social Links</h1>
            <p className="mb-4 text-zinc-600">
              Add two social links to verify your digital identity.
            </p>
            <div className="space-y-8">
              <div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                    <Linkedin className="h-5 w-5 text-zinc-500" />
                  </div>
                  <Input className="h-14 pl-10" placeholder="LinkedIn URL" />
                </div>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <LinkIcon className="h-5 w-5 text-zinc-500" />
                </div>
                <Input
                  className="h-14 pl-10"
                  placeholder="Twitter / X, Instagram, etc."
                />
              </div>

              {additionalLinks.map((link, index) => (
                <div key={index} className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                    <LinkIcon className="h-5 w-5 text-zinc-500" />
                  </div>
                  <Input
                    className="h-14 pr-10 pl-10"
                    placeholder="Add another social link"
                    value={link}
                    onChange={(e: any) =>
                      handleLinkChange(index, e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400 hover:text-zinc-600"
                    onClick={() => handleRemoveLink(index)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Remove link</span>
                  </Button>
                </div>
              ))}

              <Button
                variant="ghost"
                className="mt-2 flex items-center justify-center rounded-full p-0 text-zinc-500"
                onClick={handleAddLink}
              >
                <PlusCircle className="h-6 w-6" strokeWidth={2} />
                <span>Add another link</span>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center">
              <Button className="rounded-full bg-zinc-900 px-6 py-2 text-white hover:bg-zinc-800">
                Complete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
