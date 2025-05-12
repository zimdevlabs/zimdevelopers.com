import { Metadata } from "next";
import SignInPageWrapper from "./wrapper";
import { preparePageMetadata } from "@/lib/metadata";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";
import { Paths } from "@/lib/constants";

export const generateMetadata = (): Metadata =>
  preparePageMetadata({
    title: "Sign In | Zim Developers Community",
    description:
      "Login to you zimdevelopers.com account to find developers for collaboration or hire.",
    pageUrl: "/sign-in",
    imageUrl: "/banner.webp",
  });

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  const { user } = await validateRequest();

  if (user) {
    redirect(callbackUrl || Paths.Home);
  }

  return <SignInPageWrapper callbackUrl={callbackUrl} />;
}
