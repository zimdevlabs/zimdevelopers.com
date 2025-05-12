import { User } from "lucia";

export default function OwnerWrapper({ user }: { user: User }) {
  return (
    <>
      <h1>Owner Wrapper</h1>
      <p>This is the owner wrapper of {user.username}</p>
    </>
  );
}
