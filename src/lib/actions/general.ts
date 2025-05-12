"use server";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getGuestUserByUsername(username: string) {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existingUser) {
    return { guestUser: existingUser };
  }

  return { guestUser: null };
}
