import { ArrowRight } from "lucide-react";

export default function TeamsHero() {
  return (
    <section className="relative">
      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              No need to work alone anymore
            </h1>
            <p className="mt-8 text-pretty text-lg text-zinc-600 sm:text-xl/8">
              Teams boost project completion times and quality. Learn how to
              collaborate with other developers and rank your team in the
              national ranking charts.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-primaryColor px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Join a Team
              </a>
              <a href="#" className="text-sm/6 font-semibold text-zinc-700">
                Create a team <ArrowRight className="size-4 inline" />
              </a>
            </div>
          </div>
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                alt="App screenshot"
                src="https://tailwindui.com/plus-assets/img/component-images/project-app-screenshot.png"
                width={2432}
                height={1442}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
