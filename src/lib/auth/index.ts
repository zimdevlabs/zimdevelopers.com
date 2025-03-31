import { Lucia, TimeSpan } from "lucia";
import { Google, GitHub } from "arctic";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { env } from "@/env.js";
import { db } from "@/server/db";
import { sessions, users, type User as DbUser } from "@/server/db/schema";
import { absoluteUrl } from "@/lib/utils";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  getSessionAttributes: (/* attributes */) => {
    return {};
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      googleId: attributes.googleId,
      githubId: attributes.githubId,
      whatsAppNumber: attributes.whatsAppNumber,
      avatar: attributes.avatar,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
      name: attributes.name,
      username: attributes.username,
      city: attributes.city,
      profileCompleted: attributes.profileCompleted,
      totalPoints: attributes.totalPoints,
      role: attributes.role,
      deletedAt: attributes.deletedAt,
      tierId: attributes.tierId,
      currentPeriodEnd: attributes.currentPeriodEnd,
    };
  },
  sessionExpiresIn: new TimeSpan(30, "d"),
  sessionCookie: {
    name: "session",

    expires: false, // session cookies have very long lifespan (2 years)
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
});

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  absoluteUrl("/auth/sign-in/google/callback")
);

export const github = new GitHub(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET,
  absoluteUrl("/auth/sign-in/github/callback")
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

type DatabaseSessionAttributes = object;
type DatabaseUserAttributes = Omit<DbUser, "hashedPassword">;
