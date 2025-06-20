"use client";

import { Icons } from "@/components/icons";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { create_developer_profile } from "@/lib/profiles/actions";
import { ChevronLeft, Linkedin, LinkIcon, PlusCircle, X } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type DeveloperFormProps = {
  prevStage: () => void;
  userId: string;
  bio: string;
  skills: string[];
  country: string;
  city: string;
  photoUrl: string;
};

export default function DeveloperForm2({
  prevStage,
  photoUrl,
  bio,
  city,
  country,
  skills,
  userId,
}: DeveloperFormProps) {
  const [linkedInUrl, setLinkedIn] = useState<string>("");
  const [discordUsername, setDiscordUsername] = useState<string>("");
  const [firstAdditional, setFirstAdditional] = useState<string>("");
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

  const [state, formAction] = useActionState(create_developer_profile, null);

  const otherLinks = [...additionalLinks, firstAdditional].filter(
    (link) => link !== "",
  );

  useEffect(() => {
    if (state?.fieldError) {
      Object.values(state.fieldError).forEach((error) => {
        toast.error(error);
      });
    }

    if (state?.done) {
      toast.success(state.successMessage);
    }

    if (state?.formError) {
      toast.error(state.formError);
    }
  }, [state]);

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
            <h1 className="mb-8 text-2xl">Social Links</h1>
            <form action={formAction}>
              <input type="hidden" value={userId} name="userId" />
              <input type="hidden" value={bio} name="bio" />
              <input
                type="hidden"
                value={JSON.stringify(skills)}
                name="skills"
              />
              <input type="hidden" value={country} name="country" />
              <input type="hidden" value={city} name="city" />
              <input type="hidden" value={photoUrl} name="avatar" />
              <input
                type="hidden"
                value={JSON.stringify(otherLinks)}
                name="otherLinks"
              />
              <div className="space-y-8">
                <p className="mb-4 text-sm text-zinc-600">
                  Your Discord Username.{" "}
                  <Link
                    href="https://discord.com/invite/ZPTtkVt58H"
                    className="text-primaryColor underline"
                    target="_blank"
                  >
                    Join Discord
                  </Link>
                </p>
                <div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                      <Icons.discord className="h-5 w-fit text-zinc-500" />
                    </div>
                    <Input
                      value={discordUsername}
                      onChange={(e) => setDiscordUsername(e.target.value)}
                      required
                      autoComplete="off"
                      name="discordUsername"
                      className="h-14 pl-10"
                      placeholder="Discord Username or URL"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-8">
                <p className="mb-4 text-sm text-zinc-600">
                  Add two social links to verify your digital identity.
                </p>
                <div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                      <Linkedin className="h-5 w-5 text-zinc-500" />
                    </div>
                    <Input
                      value={linkedInUrl}
                      onChange={(e) => setLinkedIn(e.target.value)}
                      type="url"
                      required
                      autoComplete="off"
                      name="linkedInUrl"
                      className="h-14 pl-10"
                      placeholder="LinkedIn URL"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                    <LinkIcon className="h-5 w-5 text-zinc-500" />
                  </div>
                  <Input
                    className="h-14 pl-10"
                    placeholder="Twitter / X, Instagram, etc."
                    value={firstAdditional}
                    onChange={(e: any) => setFirstAdditional(e.target.value)}
                    type="url"
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
                  type="button"
                  variant="ghost"
                  className="flex items-center justify-center rounded-full p-0 text-zinc-500"
                  onClick={handleAddLink}
                >
                  <PlusCircle className="h-6 w-6" strokeWidth={2} />
                  <span>Add another link</span>
                </Button>
              </div>
              {state?.fieldError ? (
                <ul className="bg-destructive/10 text-destructive list-disc space-y-1 rounded-lg border p-2 text-[0.8rem] font-medium">
                  {Object.values(state.fieldError).map((err, i) => (
                    <li className="ml-4" key={i}>
                      {err}
                    </li>
                  ))}
                </ul>
              ) : state?.formError ? (
                <p className="bg-destructive/10 text-destructive rounded-lg border p-2 text-[0.8rem] font-medium">
                  {state?.formError}
                </p>
              ) : null}
              <div className="my-8 flex items-center justify-center">
                <SubmitButton
                  disabled={!linkedInUrl || !discordUsername}
                  className="rounded-full bg-zinc-900 px-6 py-2 text-white hover:bg-zinc-800"
                >
                  Complete
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
