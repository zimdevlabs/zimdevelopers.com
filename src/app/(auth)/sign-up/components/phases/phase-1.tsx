"use client";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircleHelp } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RESERVED_NAMES = ["John Doe"];

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .refine((name) => !RESERVED_NAMES.includes(name), {
      message: "Name is reserved",
    })
    .refine((name) => {
      const nameParts = name.trim().split(/\s+/);
      return nameParts.length >= 2;
    }, "Enter your full name."),

  speciality: z.string().min(1, { message: "Speciality is required" }),
});

export default function Phase1({
  speciality,
  setPhase,
  setName,
  setSpeciality,
}: {
  setPhase: Dispatch<SetStateAction<number>>;
  speciality: string;
  setName: Dispatch<SetStateAction<string>>;
  setSpeciality: Dispatch<SetStateAction<string>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      speciality: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setName(values.name);
    setSpeciality(values.speciality);
    setPhase(2);
  }

  const options = [
    {
      value: "designer",
      label: "UI/UX Designer",
      description:
        "I use design tools such as Abobe CC, Figma, Canva etc to create user interfaces, banners, logos etc.",
    },
    {
      value: "programmer",
      label: "Programmer",
      description:
        "I write code in languages such as JavaScript, Python, Ruby, Java among others for web, mobile and desktop app development.",
    },
    {
      value: "recruiter",
      label: "Recruiter",
      description:
        "I am looking to hire talent for my company, client or personal project.",
    },
  ];

  return (
    <div className="p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto h-[500px] md:h-fit flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
        >
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              A totally new developer experience awaits you
            </h1>
          </div>
          <div className="w-full max-w-md">
            <FormField
              control={form.control}
              name="speciality"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Which option best describes you:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="border rounded-lg overflow-hidden"
                    >
                      {options.map((option) => (
                        <FormItem
                          key={option.value}
                          className="flex items-center justify-between px-4 py-2 border-b"
                        >
                          <div className="flex items-center space-x-3">
                            <FormControl>
                              <RadioGroupItem
                                value={option.value}
                                onClick={() => setSpeciality(option.value)}
                                className="h-4 w-4 border-2 text-teal-500 data-[state=checked]:border-teal-500 border-zinc-400"
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {option.label}
                            </FormLabel>
                          </div>
                          <AboutHoverCard>
                            <p className="text-sm text-gray-600">
                              {option.description}
                            </p>
                          </AboutHoverCard>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {speciality && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button
            className="bg-primaryColor hover:bg-primaryColor/80"
            type="submit"
          >
            {speciality ? "Continue" : "Next"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

function AboutHoverCard({ children }: { children: React.ReactNode }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <CircleHelp className="size-5 fill-zinc-600" color="white" />
      </HoverCardTrigger>
      <HoverCardContent className="w-48 p-4">
        <div className="flex justify-between space-x-4">{children}</div>
      </HoverCardContent>
    </HoverCard>
  );
}
