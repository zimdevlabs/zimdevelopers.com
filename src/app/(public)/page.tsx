import HomeLayout from "@/components/home";
import { preparePageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const generateMetadata = (): Metadata =>
  preparePageMetadata({
    title: "Zim Developers Community",
    description: "An open source community of Zimbabwean developers.",
    pageUrl: "/sign-up",
    imageUrl: "/banner.webp",
  });

export default function HomePage() {
  return (
    <>
      <HomeLayout />
    </>
  );
}
