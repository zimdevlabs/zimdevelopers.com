import { validateRequest } from "@/lib/auth/validate-request";
import { getGuestUserByUsername } from "@/lib/actions/general";
import { notFound, redirect } from "next/navigation";
import GuestWrapper from "./guest-wrapper";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserProfile({ params }: Props) {
  const { username } = await params;

  const { user } = await validateRequest();

  if (user && user.username == username) {
    if (!user.devProfileCompleted && !user.empProfileCompleted) {
      return redirect("/get-started");
    }
    return redirect(`/developer-workspace/home`);
  }

  const { guestUser } = await getGuestUserByUsername(username);

  if (guestUser)
    return <GuestWrapper user={guestUser} isLoggedIn={user ? true : false} />;

  return notFound();
}
