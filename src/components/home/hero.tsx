import { InfoIcon } from "lucide-react";
import { Container } from "../container";
import { Navbar } from "../navbar";
import { Link } from "../navbar/link";
import { Button } from "../ui/button";
import { Gradient } from "./gradient";
import PortfolioCarousel from "../portfolio-carousel";

export default function HomeHero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 top-0 right-0 left-0" />
      <Container className="relative">
        <Navbar
          banner={
            <Link
              href="https://chat.whatsapp.com/FfXS39iLv7k36jrskKjOfX"
              className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 text-white data-hover:bg-fuchsia-950/30"
            >
              Platform under construction
              <InfoIcon className="size-4" />
            </Link>
          }
        />
        <div className="pt-16 sm:pt-24 md:pt-32 md:pb-48">
          <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-7xl/[0.8] md:text-8xl/[0.8]">
            Close every deal.
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 text-gray-950/75 sm:text-2xl/8">
            Zim Developers is a community platform of creatives, connecting you with the talent and tools to get work underway.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button className="bg-zinc-900 text-white rounded-full p-6">Hire Developer</Button>
            <Button variant="outline" className="border border-zinc-900/20 shadow-2xl p-6 rounded-full bg-secondaryColor hover:bg-secondaryColor/90">
              Get Hired
            </Button>
          </div>
        </div>
        <div className="md:absolute bottom-0 md:inset-80 md:translate-x-80">
          <PortfolioCarousel />
        </div>
      </Container>
    </div>
  )
}
