import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="relative overflow-hidden bg-teal-600 py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg text-white">
            Coding can be difficult sometimes. Joining a developer community
            will make it easier for you
          </p>
          <Link
            href="/pricing"
            className="mt-10 block mx-auto px-4 py-2 bg-white text-zinc-700 rounded-md text-sm font-semibold w-fit"
          >
            Create free account
          </Link>
        </div>
      </div>
    </section>
  );
}
