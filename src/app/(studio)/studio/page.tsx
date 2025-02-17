import { users } from "@/demo/data";
import StudioWrapper from "./wrapper";

export default function NewArticlePage() {
  const user = users[0];

  return <StudioWrapper user={user} />;
}
