import { validateRequest } from "@/lib/auth/validate-request";
import GetStartedWrapper from "./wrapper";
import { redirect } from "next/navigation";

export default async function GetStartedPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/sign-in");
  }

  if (user.devProfileCompleted && user.empProfileCompleted) {
    return redirect(
      user.devProfileCompleted
        ? "/developer-workspace/dashboard"
        : "/hiring-workspace/dashboard",
    );
  }

  return <GetStartedWrapper user={user} />;
}
