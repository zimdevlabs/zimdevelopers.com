// auth/sign-in/google/route.ts

import { cookies } from "next/headers";
import { generateCodeVerifier, generateState } from "arctic";
import { google } from "@/lib/auth";
import { env } from "@/env";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, [
    "profile",
    "email",
  ]);

  const searchParams = request.nextUrl.searchParams;
  const callbackUrl = searchParams.get("callbackUrl");

  (await cookies()).set("google_oauth_state", state, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  (await cookies()).set("google_oauth_code_verifier", codeVerifier, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  (await cookies()).set("google_oauth_callbackUrl", callbackUrl || "/", {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
}
