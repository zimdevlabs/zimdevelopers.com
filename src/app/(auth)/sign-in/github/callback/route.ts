// sign-in/github/callback/route.ts

import { cookies } from "next/headers";
import { generateId } from "lucia";
import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { github, lucia } from "@/lib/auth";
import { db } from "@/server/db";
import { Paths } from "@/lib/constants";
import { users } from "@/server/db/schema";
import { NextRequest } from "next/server";
import { convertToSlug } from "@/lib/utils";

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string | null;
}

interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}

async function validateRequest(
  request: NextRequest,
): Promise<{ code: string; state: string; callbackUrl: string } | Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState =
    (await cookies()).get("github_oauth_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
      headers: { Location: Paths.Login },
    });
  }

  const storedCallbackUrl =
    (await cookies()).get("github_oauth_callbackUrl")?.value ?? null;
  const callbackUrl = storedCallbackUrl || "/";

  (await cookies()).set("github_oauth_state", "", { maxAge: 0 });
  (await cookies()).set("github_oauth_callbackUrl", "", { maxAge: 0 });

  return { code, state, callbackUrl };
}

async function getGitHubUserData(
  accessToken: string,
): Promise<{ user: GitHubUser; primaryEmail: GitHubEmail | undefined }> {
  const [userRes, emailRes] = await Promise.all([
    fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
    fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  ]);

  if (!userRes.ok || !emailRes.ok) {
    console.error(
      "Failed to fetch user data:",
      userRes.status,
      emailRes.status,
    );
    console.error("User response:", await userRes.text());
    console.error("Email response:", await emailRes.text());

    if (userRes.status === 403 || emailRes.status === 403) {
      throw new Error(
        "GitHub API rate limit exceeded or insufficient permissions",
      );
    }

    throw new Error(
      `Failed to fetch user data from GitHub: ${userRes.status} ${emailRes.status}`,
    );
  }

  const user: GitHubUser = await userRes.json();
  const emails: GitHubEmail[] = await emailRes.json();

  // console.log("GitHub user:", user);
  // console.log("GitHub emails:", emails);

  if (!Array.isArray(emails)) {
    console.error("Unexpected emails response:", emails);
    throw new Error("Unexpected response format from GitHub emails API");
  }

  const primaryEmail = emails.find((email) => email.primary);

  if (!primaryEmail) {
    console.error("No primary email found:", emails);
    throw new Error("No primary email found in GitHub account");
  }

  return { user, primaryEmail };
}

async function createOrUpdateUser(
  githubUser: GitHubUser,
  primaryEmail: GitHubEmail,
): Promise<string> {
  const existingUser = await db.query.users.findFirst({
    where: (table, { eq, or }) =>
      or(
        eq(table.githubId, githubUser.id.toString()),
        eq(table.email, primaryEmail.email),
      ),
  });

  if (!existingUser) {
    const userId = generateId(21);
    const usernameSuffix = generateId(8);
    const nameSlug = convertToSlug(githubUser.name || githubUser.login);

    await db.insert(users).values({
      id: userId,
      email: primaryEmail.email,
      emailVerified: true,
      githubId: githubUser.id.toString(),
      avatar: githubUser.avatar_url,
      fullName: githubUser.name || githubUser.login,
      username: `${nameSlug}-${usernameSuffix}`,
    });
    return userId;
  }

  if (
    existingUser.githubId !== githubUser.id.toString() ||
    existingUser.avatar !== githubUser.avatar_url
  ) {
    await db
      .update(users)
      .set({
        githubId: githubUser.id.toString(),
        emailVerified: true,
        avatar: githubUser.avatar_url,
        fullName: githubUser.name || githubUser.login,
      })
      .where(eq(users.id, existingUser.id));
  }

  return existingUser.id;
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const validation = await validateRequest(request);
    if (validation instanceof Response) return validation;

    const { code, callbackUrl } = validation;
    const tokens = await github.validateAuthorizationCode(code);

    try {
      const { user: githubUser, primaryEmail } = await getGitHubUserData(
        tokens.accessToken(),
      );

      if (!primaryEmail || !primaryEmail.verified) {
        return new Response(
          JSON.stringify({
            error:
              "Your GitHub account must have a verified primary email address.",
          }),
          { status: 400, headers: { Location: Paths.Login } },
        );
      }

      const userId = await createOrUpdateUser(githubUser, primaryEmail);
      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

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
