import { User } from "lucia";
import HomeHero from "./hero";

export default function HomeLayout({ user }: { user?: User }) {
  return (
    <main>
      <HomeHero user={user} />
    </main>
  );
}
