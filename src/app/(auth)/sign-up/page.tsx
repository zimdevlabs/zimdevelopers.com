import { Metadata } from "next";
import SignUpPageWrapper from "./wrapper";
import { preparePageMetadata } from "@/lib/metadata";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";

export const generateMetadata = (): Metadata =>
  preparePageMetadata({
    title: "Sign Up | Zim Developers Community",
    description: "Create a free account to join the Zim Developers Community.",
    pageUrl: "/sign-up",
    imageUrl: "/banner.webp",
  });

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  const { user } = await validateRequest();

  if (user) redirect(callbackUrl || `/u/${user.username}`);

  return <SignUpPageWrapper callbackUrl={callbackUrl} />;
}
