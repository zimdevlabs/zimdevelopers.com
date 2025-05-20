"use server";

import { db } from "@/server/db";
import { CreateDevProfileInput, createDevProfileShema } from "./validators";
import { generateId } from "lucia";
import { developerProfiles, users } from "@/server/db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
  successMessage?: string;
  done?: boolean;
}

export async function create_developer_profile(
  _: any,
  formData: FormData,
): Promise<ActionResponse<CreateDevProfileInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = createDevProfileShema.safeParse(obj);

  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        userId: err.fieldErrors.userId?.[0],
        username: err.fieldErrors.username?.[0],
        bio: err.fieldErrors.bio?.[0],
        skills: err.fieldErrors.skills?.[0],
        country: err.fieldErrors.country?.[0],
        city: err.fieldErrors.city?.[0],
        avatar: err.fieldErrors.avatar?.[0],
        linkedInUrl: err.fieldErrors.linkedInUrl?.[0],
        otherLinks: err.fieldErrors.otherLinks?.[0],
      },
    };
  }

  const {
    bio,
    skills,
    country,
    city,
    avatar,
    linkedInUrl,
    otherLinks,
    userId,
    username,
  } = parsed.data;

  const existingProfile = await db.query.developerProfiles.findFirst({
    where: (table, { eq }) => eq(table.userId, userId),
  });

  if (existingProfile) {
    return {
      formError: "Profile already exists",
    };
  }

  const profileId = generateId(21);

  await db.insert(developerProfiles).values({
    id: profileId,
    userId,
    bio,
    skills: JSON.parse(skills),
    country,
    city,
    avatar,
    linkedInUrl,
    otherLinks: otherLinks ? JSON.parse(otherLinks) : [],
  });

  return redirect(`/u/${username}`);
}

export async function updateAvatarUrl(avatarUrl: string, userId: string) {
  if (avatarUrl != "") {
    await db
      .update(users)
      .set({ avatar: avatarUrl, updatedAt: new Date() })
      .where(eq(users.id, userId));
  } else {
    throw new Error("Failed to update avatar url");
  }
}
