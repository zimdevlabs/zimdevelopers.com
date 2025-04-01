import { ArrowRight } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="relative">
      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Zim Developers Community
            </h1>
            <p className="mt-8 text-pretty text-lg text-zinc-600 sm:text-xl/8">
              We are a group of Zimbabwean programmers, designers and
              entreprenuers. Find the best Zim talent for collaboration or
              hiring.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/sign-up"
                className="rounded-md bg-primaryColor px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primaryColor/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Create free account
              </a>
              <a href="/blog" className="text-sm/6 font-semibold text-zinc-700">
                Explore blog <ArrowRight className="inline size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
