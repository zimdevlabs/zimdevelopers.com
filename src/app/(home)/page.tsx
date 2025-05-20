import HomeLayout from "@/components/home";
import { validateRequest } from "@/lib/auth/validate-request";
import { preparePageMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = (): Metadata =>
  preparePageMetadata({
    title: "Zim Developers Community",
    description: "An open source community of Zimbabwean developers.",
    pageUrl: "/sign-up",
    imageUrl: "/banner.webp",
  });

export default async function HomePage() {
  const { user } = await validateRequest();

  if (user) {
    if (!user.devProfileCompleted || !user.empProfileCompleted) {
      return redirect("/get-started");
    }
  }

  return (
    <>
      <HomeLayout user={user || undefined} />
    </>
  );
}
