import { cookies } from "next/headers";
import { generateId } from "lucia";
import { OAuth2RequestError } from "arctic";
import { eq, or } from "drizzle-orm";
import { google, lucia } from "@/lib/auth";
import { db } from "@/server/db";
import { Paths } from "@/lib/constants";
import { users } from "@/server/db/schema";
import { NextRequest } from "next/server";

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

async function validateRequest(
  request: NextRequest,
): Promise<
  | { code: string; state: string; codeVerifier: string; callbackUrl: string }
  | Response
> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return new Response(null, {
      status: 400,
      headers: { Location: Paths.Login },
    });
  }

  const storedState =
    (await cookies()).get("google_oauth_state")?.value ?? null;
  const storedCodeVerifier =
    (await cookies()).get("google_oauth_code_verifier")?.value ?? null;

  if (!storedState || state !== storedState || !storedCodeVerifier) {
    return new Response(null, {
      status: 400,
      headers: { Location: Paths.Login },
    });
  }

  const storedCallbackUrl =
    (await cookies()).get("google_oauth_callbackUrl")?.value ?? null;
  const callbackUrl = storedCallbackUrl || "/";

  // Clear the cookies after use
  (
    await // Clear the cookies after use
    cookies()
  ).set("google_oauth_state", "", { maxAge: 0 });
  (await cookies()).set("google_oauth_code_verifier", "", { maxAge: 0 });

  return { code, state, codeVerifier: storedCodeVerifier, callbackUrl };
}

async function getGoogleUserData(accessToken: string): Promise<GoogleUser> {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  if (!response.ok) {
    console.error("Failed to fetch user data:", response.status);
    console.error("Response:", await response.text());

    if (response.status === 401) {
      throw new Error("Invalid access token");
    }

    throw new Error(
      `Failed to fetch user data from Google: ${response.status}`,
    );
  }

  return await response.json();
}

async function createOrUpdateUser(googleUser: GoogleUser): Promise<string> {
  const existingUser = await db.query.users.findFirst({
    where: (table) =>
      or(eq(table.googleId, googleUser.id), eq(table.email, googleUser.email)),
  });

  if (!existingUser) {
    const userId = generateId(21);
    const userName = generateId(8);

    await db.insert(users).values({
      id: userId,
      email: googleUser.email,
      googleId: googleUser.id,
      avatar: googleUser.picture,
      name: googleUser.name,
      username: `ib-${userName}`,
    });
    return userId;
  }

  if (
    existingUser.googleId !== googleUser.id ||
    existingUser.avatar !== googleUser.picture
  ) {
    await db
      .update(users)
      .set({
        googleId: googleUser.id,
        avatar: googleUser.picture,
        name: googleUser.name,
      })
      .where(eq(users.id, existingUser.id));
  }

  return existingUser.id;
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const validation = await validateRequest(request);
    if (validation instanceof Response) return validation;

    const { code, codeVerifier, callbackUrl } = validation;
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);

    // console.log(`tokens: ${tokens.accessToken.toString()}`);

    // Log the tokens for debugging
    // console.log("Tokens received:", tokens);

    try {
      // Use the correct access token field
      // @ts-expect-error -- Property 'access_token' does not exist on type 'object'
      const googleUser = await getGoogleUserData(tokens.data.access_token);

      if (!googleUser.verified_email) {
        return new Response(
          JSON.stringify({
            error: "Your Google account must have a verified email address.",
          }),
          { status: 400, headers: { Location: Paths.Login } },
        );
      }

      const userId = await createOrUpdateUser(googleUser);
      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      (await cookies()).set(sessionCookie.name, sessionCookie.value, {
        ...sessionCookie.attributes,
        domain: "www.ibzim.com",
      });

      console.log("cookie1");

      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      console.log("cookie2");

      return new Response(null, {
        status: 302,
        headers: {
          Location: callbackUrl ? callbackUrl : "/",
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { Location: Paths.Login },
        });
      }
      throw error;
    }
  } catch (e) {
    console.error(e);
    if (e instanceof OAuth2RequestError) {
      return new Response(JSON.stringify({ error: "Invalid code" }), {
        status: 400,
        headers: { Location: Paths.Login },
      });
    }
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { Location: Paths.Login },
    });
  }
}
