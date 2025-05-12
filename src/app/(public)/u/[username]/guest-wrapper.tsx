import { User } from "lucia";

export default function GuestWrapper({
  user,
  isLoggedIn,
}: {
  user: User;
  isLoggedIn: boolean;
}) {
  return (
    <>
      <span>Viewing as guest on {user.username}</span>
      <span>Viewer is {isLoggedIn ? "Logged In" : "Not Logged In"}</span>
    </>
  );
}
