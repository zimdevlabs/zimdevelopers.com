import { Faqs } from "@/components/home/faqs";
import HomeCTA from "@/components/home/home-cta";
import HomeHero from "@/components/home/home-hero";
// import { Testimonials } from "@/components/home/testimonials";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeCTA />
      {/* <Testimonials /> */}
      <Faqs />
    </>
  );
}
