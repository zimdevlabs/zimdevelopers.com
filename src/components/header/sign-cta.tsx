import Link from "next/link";

export default function SignCTA () {
  return (
    <div className="flex flex-1 justify-end items-center gap-3 md:gap-4">
      <Link
        href="/sign-up"
        className="text-sm bg-primaryColor hover:bg-primaryColor/80 px-4 py-2 rounded-md text-white"
      >
        <span className="hidden md:inline-block">Create Free Account</span>
        <span className="md:hidden">Create&nbsp;Account</span>
      </Link>
      <Link
        href="/sign-in"
        className="text-sm leading-6 text-zinc-700 hover:text-zinc-900 dark:text-white/80 dark:hover:text-white group"
      >
        Log&nbsp;in&nbsp;
      </Link>
    </div>
  )
  
}