// auth/sign-in/github/route.ts

import { cookies } from "next/headers";
import { generateState } from "arctic";
import { github } from "@/lib/auth";
import { env } from "@/env";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const state = generateState();
  const url = await github.createAuthorizationURL(state, ["identify", "email"]);
  const searchParams = request.nextUrl.searchParams;
  const callbackUrl = searchParams.get("callbackUrl");

  (await cookies()).set("github_oauth_state", state, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  (await cookies()).set("github_oauth_callbackUrl", callbackUrl || "/", {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
}
