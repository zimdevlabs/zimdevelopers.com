"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const PERSONAL_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "protonmail.com",
  "mail.com",
  "zoho.com",
  "yandex.com",
  "gmx.com",
];

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .refine(
      (email) => {
        const domain = email.split("@")[1];
        return !PERSONAL_EMAIL_DOMAINS.includes(domain);
      },
      {
        message: "Please use your work email address",
      }
    ),
});

export function Phase3({
  setPhase,
  setEmail,
}: {
  setPhase: Dispatch<SetStateAction<number>>;
  setEmail: Dispatch<SetStateAction<string>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setEmail(values.email);
    setPhase(4);
  }

  return (
    <div className="p-8">
      <div className="mx-auto h-[500px] md:h-fit flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="grid gap-6">
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            Create your account
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.name@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4">
                Continue with email
              </Button>
            </form>
          </Form>
          <Button
            variant={"ghost"}
            className="text-primaryColor font-normal text-sm"
            onClick={() => setPhase(2)}
          >
            <ArrowLeft className="size-4 mt-0" />
            Other Signup options
          </Button>
        </div>
      </div>
    </div>
  );
}
