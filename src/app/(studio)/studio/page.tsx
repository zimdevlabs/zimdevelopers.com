import StudioWrapper from "./wrapper";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";
import { Paths } from "@/lib/constants";

export default async function NewArticlePage() {
  const { user } = await validateRequest();

  if (!user) {
    redirect(Paths.Login);
  }

  return <StudioWrapper user={user} />;
}
