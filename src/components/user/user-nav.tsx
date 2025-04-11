import {
  ChevronRightIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import NavLink from "./nav-link";

export default function UserNav({ username }: { username: string }) {
  return (
    <section className="relative mx-auto hidden w-full max-w-7xl px-4 sm:px-8 lg:block lg:px-12">
      <nav className="flex items-center justify-between border-b border-gray-300 pb-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <NavLink
              href={`/user/${username}`}
              className="flex items-center gap-2"
            >
              <Squares2X2Icon className="h-8 w-full text-primaryColor" />
              <div>Dashboard</div>
            </NavLink>
            <ChevronRightIcon className="h-4 w-fit" />
          </div>
          <NavLink href="#">
            <span>Leaderboard</span>
          </NavLink>
        </div>
        <NavLink href="/user/settings" className="flex items-center gap-2">
          <Cog6ToothIcon className="h-fit w-8 text-primaryColor" />
          <div>Settings</div>
        </NavLink>
      </nav>
    </section>
  );
}
